const constants = {
    SESSION_USR: 'user',
    SESSION_ORG: 'organizer',
    LOGGED_IN: 'loggedIn',
    LOGIN_ERR: 'Invalid credentials',
    EMAIL_CONFIRM_EMAIL_ERR: 'The Email and the Confirm Email should be same',
    ORGANIZATION_NAME_ERR: 'Please fill out the organization name',
    RESISTRATION_SUCCESS:
        'You have successfully registered. Please login in with the same credentials',
    EVENT_BOOKING_ALERT: 'Your event is pending to be approved by the admin.',
    CREATE_EVNT_ERR: 'Please login to create event',
    SALUTATION_ORG: 'Hi Organizer !!',
    ADMIN_EMAIL: 'admin@admin.ca',
    ADMIN_PASSWORD: 'adminadmin',
    ADMIN: 'admin',
    MANAGE_EVNT_ERR: 'Please login with admin credentials to manage events',
    APP_SUB: 'Event Approved 🎉',
    APP_MSG:
        'We are pleased to inform you that your event has been successfully approved!. You can now view the events on the page where it is publicly available for bookings. Thank you for choosing our platform. We look forward to seeing your events success!',
    REJ_SUB: 'Event Rejected 🙇‍♀️',
    REJ_MSG:
        'Thank you for submitting the event for approval. After careful review, we regret to inform you that your event has not met the necessary criteria and has been rejected',
};

module.exports = constants;
