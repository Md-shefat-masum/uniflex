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
            car_id,
            title,
            date,
            location,
            total_seat,
            total_booked
        ) {
            data.push({
                id,
                car_id,
                title,
                date,
                location,
                total_seat,
                total_booked,
                created_at: '2024-11-14',
                updated_at: '2024-11-14',
            });
        }

        set_data(
            1,
            1,
            `Toyota 001`,
            '2024-11-27 11:30:00',
            `Paltan, road 1, office ground`,
            15,
            2
        );


        await queryInterface.bulkDelete('car_booking_schedules', null, {});
        await queryInterface.bulkInsert('car_booking_schedules', data, {});
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         
         npx sequelize-cli db:seed:all --config src/configs/db.json --seeders-path src/modules/project_visit_management/car_booking_schedules/models/seeders
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('car_booking_schedules', null, {});
    },
};
