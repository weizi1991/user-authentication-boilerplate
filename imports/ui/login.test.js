import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect, { createSpy, spyOn, isSpy } from 'expect';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Login } from './Login';


if (Meteor.isClient) {
    describe('Login', function () {
        it ('should show error messages', function () {
            const error = 'This is not working';
            const wrapper = mount( <Login loginWithPassword={()=> {}}/>);

            wrapper.setState({ error });
            expect(wrapper.find('p').text()).toBe(error);

            wrapper.setState({ error: ''});
            expect(wrapper.find('p').length).toBe(0);
        })

        it('should call loginWithPassword with the form data', function() {
            const email = 'azi@test.com';
            const password = 'password123';
            const spy = expect.createSpy();
            const wrapper = mount( <Login loginWithPassword={spy}/> );

            wrapper.ref('email').value = email;
            wrapper.ref('password').value = password;
            wrapper.find('form').simulate('submit');
            //email is object ,using toEqual
            expect(spy.calls[0].arguments[0]).toEqual({ email }); 
            //password is string, using password
            expect(spy.calls[0].arguments[1]).toBe( password );
        });

        it('should set loginWithPassword callback errors', function() {
            const spy = expect.createSpy();
            const wrapper = mount (<Login loginWithPassword={spy}/> );

            wrapper.find('form').simulate('submit');

            spy.calls[0].arguments[2]({});
            expect(wrapper.state('error')).toNotBe('');

            spy.calls[0].arguments[2]();
            expect(wrapper.state('error')).toBe('');
        });
    })
}