/*
  This component is used to show a loading spinner

  Usage:

  <Loading />

*/

const Loading = () => (
  <div className="flex justify-center items-center ">
    <div
      className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"
      role="status"
      aria-live="polite"
      aria-label="Loading"
    ></div>
  </div>
);

export default Loading;
