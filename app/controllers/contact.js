import Ember from 'ember';

export default Ember.Controller.extend({
  isEmailValid: Ember.computed.match('emailAddress', /^.+@.+\..+$/),
  isMessageValid: Ember.computed.gte('message.length', 5),
  isValid: Ember.computed.and('isEmailValid','isMessageValid'),
  isDisabled: Ember.computed.not('isValid'),
  actions: {
    sendMessage() {
      const email = this.get('emailAddress');
      const message = this.get('message');

      const newContact = this.store.createRecord('contact', { email: email, message: message });
      newContact.save().then((response) => {
        alert(`Email: ${this.get('emailAddress')}, message: ${this.get('message')}`);
        this.set('responseMessage', `We got your message and we’ll get in touch soon`);
        this.set('emailAddress', '');
        this.set('message', '');
      });
    }
  }

});
