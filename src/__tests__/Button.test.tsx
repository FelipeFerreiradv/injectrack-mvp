/**
 * Testes unitários do componente Button
 */

import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Button } from "../components/Button";

describe("Button Component", () => {
  it("deve renderizar corretamente", () => {
    const { getByText } = render(<Button title="Teste" onPress={() => {}} />);
    expect(getByText("Teste")).toBeTruthy();
  });

  it("deve chamar onPress quando pressionado", () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <Button title="Teste" onPress={onPressMock} />
    );
    fireEvent.press(getByText("Teste"));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it("não deve chamar onPress quando desabilitado", () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <Button title="Teste" onPress={onPressMock} disabled />
    );
    fireEvent.press(getByText("Teste"));
    expect(onPressMock).not.toHaveBeenCalled();
  });

  it("deve mostrar loading quando loading=true", () => {
    const { queryByText } = render(
      <Button title="Teste" onPress={() => {}} loading />
    );
    expect(queryByText("Teste")).toBeNull();
  });
});
