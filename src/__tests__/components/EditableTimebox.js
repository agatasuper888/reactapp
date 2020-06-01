import { render, cleanup, fireEvent } from '@testing-library/react';
import React from "react";
import EditableTimebox from "../../components/EditableTimebox"

describe('<EditableTimebox />', () => {
    afterEach(cleanup)
    it('shows edit button', () => {
        const { getByText } = render(<EditableTimebox />)
        expect(() => {
            getByText("Edytuj")
        }).not.toThrow()
    });

    it('allows edititing the timebox', () => {
        const { getByText } = render(<EditableTimebox />)

        fireEvent.click(getByText("Edytuj"))

        fireEvent.click(getByText(/zmiany/))

        expect(() => {
            getByText("Edytuj")
        }).not.toThrow()
    });
});