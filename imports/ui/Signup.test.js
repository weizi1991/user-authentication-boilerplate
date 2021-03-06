import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect, { createSpy, spyOn, isSpy } from 'expect';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Signup } from './Signup';


if (Meteor.isClient) {
    describe('Signup', function () {
        it ('should show error messages', function () {
            const error = 'This is not working';
            const wrapper = mount( <Signup createUser={()=> {}}/>);

            wrapper.setState({ error });
            expect(wrapper.find('p').text()).toBe(error);

            wrapper.setState({ error: ''});
            expect(wrapper.find('p').length).toBe(0);
        })

        it('should call createUser with the form data', function() {
            const email = 'azi@test.com';
            const password = 'password123';
            const spy = expect.createSpy();
            const wrapper = mount( <Signup createUser={spy}/> );

            wrapper.ref('email').value = email;
            wrapper.ref('password').value = password;
            wrapper.find('form').simulate('submit');
            //email is object ,using toEqual
            expect(spy.calls[0].arguments[0]).toEqual({ email, password }); 
        });

        it('should set error if short password', function() {
            const email = 'azi@test.com';
            const password = '123               ';
            const spy = expect.createSpy();
            const wrapper = mount (<Signup createUser={spy}/> );

            wrapper.ref('email').value = email;
            wrapper.ref('password').value = password;
            wrapper.find('form').simulate('submit');

            expect(wrapper.state('error').length).toBeGreaterThan(0);
        });

        // it('should set createUser callback err', function() {
        //     const spy = expect.createSpy();
        //     const reason = 'this is why it failed';
        //     const password = 'Password123';
        //     const wrapper = mount (<Signup createUser={spy}/> );
            
        //     wrapper.ref('password').value = password;
        //     wrapper.find('form').simulate('submit');

        //     spy.calls[0].arguments[1]({ reason });
        //     expect(wrapper.state('error')).toBe(reason);

        //     spy.calls[0].arguments[1]();
        //     expect(wrapper.state('error')).toBe('');

        // })
    })
}