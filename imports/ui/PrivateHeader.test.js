import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect, { createSpy, spyOn, isSpy } from 'expect';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { PrivateHeader } from './PrivateHeader';

configure({ adapter: new Adapter() });

if (Meteor.isClient) {
    describe('PrivateHeader', function (){
        it('should set button text to logout', function () {
            const wrapper = mount( <PrivateHeader titile="Test title" handleLogout={() => {}}/> )
            const buttonText = wrapper.find('.button').text();
            expect(buttonText).toBe('Log out');
        });

        it('should user title prop as h1 text', function () {
            const title = 'Test title here';
            //use mount to render PrivateHeader with title
            const wrapper = mount( <PrivateHeader title={title} /> );
            const h1text = wrapper.find('h1').text();
            expect(h1text).toBe('Test title here')
        });



        it('should call handleLogout on click', function () {
            const spy = expect.createSpy();
            const wrapper = mount( <PrivateHeader title="Title" handleLogout={spy}/>);
            wrapper.find('button').simulate('click');
            expect(spy).toHaveBeenCalled();
        })
    })
}