import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const data = await request.json();

    console.log({ data });

    // Wait for 3 seconds before sending the response
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return NextResponse.json(
      { ok: true, orderNumber: 1122334455 },
      { status: 200 }
    );
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
