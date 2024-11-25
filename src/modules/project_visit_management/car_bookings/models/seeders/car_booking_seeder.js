'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */

        let data = [];
        function set_data(
            id,
            car_booking_schedule_id,
            car_id,
            title,
            date,
            passenger_name,
            passenger_contact,
            seat_no,
        ) {
            data.push({
                id,
                car_booking_schedule_id,
                car_id,
                title,
                date,
                passenger_name,
                passenger_contact,
                seat_no,
                created_at: '2024-11-14',
                updated_at: '2024-11-14',
            });
        }

        set_data(
            1,
            1,
            1,
            'toyota 001',
            '2024-11-27 11:30:00',
            'passenger 1',
            '0164376015',
            1,
        );

        set_data(
            2,
            1,
            1,
            'toyota 001',
            '2024-11-27 11:30:00',
            'passenger 2',
            '0164376015',
            10,
        );

        await queryInterface.bulkDelete('car_bookings', null, {});
        await queryInterface.bulkInsert('car_bookings', data, {});
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         
         npx sequelize-cli db:seed:all --config src/configs/db.json --seeders-path src/modules/project_visit_management/car_bookings/models/seeders
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('car_bookings', null, {});
    },
};
