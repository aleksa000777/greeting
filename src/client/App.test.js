/* eslint-disable */
import React from "react";
import { shallow, mount, render } from "enzyme";
import App from "./App";

const Enzyme = require("enzyme");
const EnzymeAdapter = require("enzyme-adapter-react-15");
// This sets up the adapter to be used by Enzyme
Enzyme.configure({ adapter: new EnzymeAdapter() });

// describe what we are testing
describe("Input Form", () => {
  // make our assertion and what we expect to happen
  it("should render without throwing an error", () => {
    expect(
      shallow(<App />)
        .find("form.greeting")
        .exists()
    ).toBe(true);
  });
});
