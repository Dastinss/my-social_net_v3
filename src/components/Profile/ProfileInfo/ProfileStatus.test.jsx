import React from "react";
import { create } from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";

describe( "ProfileStatus component", () => { //92 создали тест на основе библиотеки https://www.valentinog.com/blog/testing-react/
	test( "status from props should be in the state", () => {
		const component = create( <ProfileStatus status="it-kamasutra.com"/> );
		const instance = component.getInstance(); // 92 дай мне конкретный экз
		expect( instance.state.status ).toBe( "it-kamasutra.com" );
	} );

	test( "after creation span should be displayed", () => {
		const component = create( <ProfileStatus status="it-kamasutra.com"/> );
		const root = component.root;
		let span = root.findByType( 'span' );
		expect( span ).not.toBeNull();
	} );

	test( "after creation input shouldn`t be displayed", () => {
		const component = create( <ProfileStatus status="it-kamasutra.com"/> );
		const root = component.root;
		expect( () => {
			let input = root.findByType( 'input' );
		} ).toThrow();
	} );

	test( "after creation span should contain correct status", () => {
		const component = create( <ProfileStatus status="it-kamasutra.com"/> );
		const root = component.root;
		let span = root.findByType( 'span' );
		expect( span.children[ 0 ] ).toBe( "it-kamasutra.com" );
	} );

	test( "input should be displayed in editMode instead of span", () => { // тестируем нажатие на кнопки
		const component = create( <ProfileStatus status="it-kamasutra.com"/> );
		const root = component.root;
		let span = root.findByType( 'span' );
		span.props.onDoubleClick();
		let input = root.findByType( 'input' )
		expect( input.props.value ).toBe( "it-kamasutra.com" );
	} );

	test( "callback should be called", () => { // тестируем вызвался ли колл бэк
		const mockCallback = jest.fn();
		const component = create( <ProfileStatus status="it-kamasutra.com" updateStatus={mockCallback}/> );
		const instance = component.getInstance();
		instance.deactivateEditMode()
		expect( mockCallback.mock.calls.length ).toBe( 1); // типа вызвали колл бек один раз
	} );
} );