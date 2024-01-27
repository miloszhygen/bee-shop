import { render, act } from "@testing-library/react";
import { useState, useEffect } from "react";
import useDebounce from "./debounce";

// Test component that uses the useDebounce hook
function TestComponent(props) {
  const debouncedValue = useDebounce(props.value, 500);
  const [latestValue, setLatestValue] = useState(debouncedValue);

  useEffect(() => {
    setLatestValue(debouncedValue);
  }, [debouncedValue]);

  return <div>{latestValue}</div>;
}

test("useDebounce hook", async () => {
  const { rerender, findByText } = render(<TestComponent value="test" />);

  // Value should initially be "test"
  expect(await findByText("test")).toBeTruthy();

  // Update props
  rerender(<TestComponent value="updated" />);

  // Value should still be "test" because the delay has not passed
  expect(await findByText("test")).toBeTruthy();

  // Wait for delay
  await act(() => new Promise((resolve) => setTimeout(resolve, 500)));

  // Value should now be "updated"
  expect(await findByText("updated")).toBeTruthy();
});
