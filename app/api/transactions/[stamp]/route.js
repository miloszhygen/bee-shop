/*

    Gets the transaction data from the database based on the stampId

    URL: ${process.env.NEXT_PUBLIC_BASE_URL}/api/transactions/${stampId}

*/

import { NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/connectToDatabase";

import { TEST } from "@/config";

export async function GET(request, { params }) {
  const { stamp } = params;

  if (TEST) {
    return NextResponse.json({
      status: 200,
      data: { sessionStamp: stamp, amount_subtotal: 133700, currency: "nok" },
    });
  }

  await new Promise((resolve) => setTimeout(resolve, 3000));

  try {
    const { client } = await connectToDatabase();
    const db = client.db(`${process.env.MONGODB_CLIENT_DB}`);
    const collection = db.collection(
      `${process.env.MONGODB_CLIENT_COLLECTION_TRANSACTIONS}`
    );
    const readFilter = { sessionStamp: stamp };
    const resultRead = await collection.findOne(readFilter);

    return NextResponse.json({ status: 200, data: resultRead });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "something went wrong",
        ok: false,
      },
      { status: 500 }
    );
  }
}
