import React from "react";
import Clock from "../../components/Clock";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";

var root = null;
var clockRenderer = null;
describe('<Clock />', () => {
    describe('when given minutes and seconds (DOM)', () => {
        beforeEach(() => {
            root = document.createElement("div");
            ReactDOM.render(
                <Clock minutes={10} seconds={20} />, root
            )
        })
        it('renders properly', () => {

            expect(root.childNodes[0].nodeName).toEqual("H2")
            expect(root.childNodes[0].className).toMatch(/Clock/)
            expect(root.childNodes[0].textContent).toMatch(/10:20/)
        });
        it('renders an h2 element', () => {
            expect(root.childNodes[0].nodeName).toEqual("H2")
        });
        it('sets a Clock className', () => {
            expect(root.childNodes[0].className).toMatch(/Clock/)
        });
        it('renders time properly', () => {
            expect(root.childNodes[0].textContent).toMatch(/10:20/)
        });

    });
    describe('when given minutes and seconds (TestRenderer)', () => {
        beforeEach(() => {
            clockRenderer = renderer.create(
                <Clock minutes={10} seconds={20} />

            );
        });
        it('renders properly', () => {
            expect(clockRenderer.toJSON()).toMatchSnapshot();

        });
        it('renders an h2 element', () => {
            expect(root.childNodes[0].nodeName).toEqual("H2")
            expect(clockRenderer.toJSON().type).toEqual("h2")
        });
        it('sets a Clock className', () => {
            expect(root.childNodes[0].className).toMatch(/Clock/)
            expect(clockRenderer.toJSON().props).toMatchObject({ "className": expect.stringMatching(/Clock/) })
        });
        it('renders time properly', () => {
            expect(root.childNodes[0].textContent).toMatch(/10:20/)
            expect(clockRenderer.toJSON().children).toEqual(expect.arrayContaining(["10", "20"]))
        });

    });


    it('sets className to empty string if not given anything else', () => {
        expect(<Clock minutes={10} seconds={20} />).toEqual(<Clock className="" minutes={10} seconds={20} />)

    });
});
