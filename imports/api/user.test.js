import { Meteor } from 'meteor/meteor';
import expect from 'expect';
import { validateNewUser } from './users';

if (Meteor.isServer) {
    describe('users', function (){
        it('should reject invalid email', function (){
            const testUser = {
                emails: [
                    {
                        address : 'Testexample.com'
                    }
                ]
            }
            expect(() => {
                validateNewUser(testUser)
            }).toThrow();
        })
        it ('should allow valid email address', function () {
            const testUser = {
                emails: [
                    {
                        address : 'Test@example.com'
                    }
                ]
            };
            const res = validateNewUser(testUser);
            expect(res).toBe(true);
        })
    })
}
