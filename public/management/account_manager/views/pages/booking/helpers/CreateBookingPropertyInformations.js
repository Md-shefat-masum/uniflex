export default [
    // {
    //     name: 'property_location',
    //     placeholder:
    //         'Enter plot location',
    //     type: 'text',
    //     label: 'Property Location',
    // },
    {
        name: 'file_id_no',
        placeholder: 'Enter file No.',
        type: 'text',
        label: 'File No.',
    },
    {
        name: 'property_place',
        type: 'select',
        label: 'Property place.',
        values: [
            {
                value: '--select--',
                text: '',
            },
            {
                value: 'east',
                text: 'east',
            },
            {
                value: 'west',
                text: 'west',
            },
            {
                value: 'north',
                text: 'north',
            },
            {
                value: 'south',
                text: 'south',
            },
        ]
    },
    {
        name: 'property_no',
        placeholder: 'Enter plot/flat no.',
        type: 'text',
        label: 'Flat / Plot No.',
    },
    {
        name: 'road_no',
        placeholder: 'Enter road no.',
        type: 'text',
        label: 'Road No.',
    },
    {
        name: 'block_no',
        placeholder: 'Enter block no.',
        type: 'text',
        label: 'Block No.',
    },
    {
        name: 'sector_no',
        placeholder: 'Enter sector no.',
        type: 'text',
        label: 'Sector No.',
    },
    {
        name: 'property_type',
        type: 'select',
        label: 'Property Type.',
        values: [
            {
                value: '--select--',
                text: '',
            },
            {
                value: 'residential',
                text: 'residential',
            },
            {
                value: 'commercial',
                text: 'commercial',
            },
        ]
    },
    {
        name: 'property_payment_terms',
        placeholder: 'Property Payment Terms',
        type: 'text',
        label: 'Property Payment Terms',
    },
    {
        name: 'size_of_property_katha',
        placeholder: 'Katha / Square Fit',
        type: 'text',
        label: 'Katha / Square Fit',
        callback: function (e, value) {
            let el = document.querySelector('#size_of_property_land_percentage');
            if (el) {
                el.value = Math.round(value * 1.65);
            }
        }
    },

    {
        name: 'size_of_property_land_percentage',
        placeholder: 'Decimal',
        type: 'text',
        label: 'Decimal ( 1 katha = 1.65 )',
    },
    {
        name: 'property_price_per_katha',
        placeholder: 'Per Katha / Flat Price',
        type: 'text',
        label: 'Per Katha / Flat Price',
        callback: function (e, value) {
            let el = document.querySelector('#property_price_per_katha_text');
            let size_el = document.querySelector('#size_of_property_katha');
            if (el) {
                el.value = (window).convertAmount(value).bn + ` টাকা মাত্র`;
            }
            
            if (size_el && size_el.value) {
                let price = +size_el.value * +value;

                let property_price_digit_el = document.querySelector('#property_price_digit');
                property_price_digit_el.value = price;

                el = document.querySelector('#property_price_text');
                let el2 = document.querySelector('#property_price_text_bangla');
                if (el && el2) {
                    el.value = (window).convertAmount(price).en + ` taka only`;
                    el2.value = (window).convertAmount(price).bn + ` টাকা মাত্র`;
                }

                let have_to_pay_amount_el = document.querySelector('#have_to_pay_amount');
                have_to_pay_amount_el.value = price;
                
                el = document.querySelector('#have_to_pay_amount_text');
                el2 = document.querySelector('#have_to_pay_amount_text_bn');
                if(el){
                    el.value = (window).convertAmount(price).en + ` taka only`;
                    el2.value = (window).convertAmount(price).bn + ` টাকা মাত্র`;
                }
            }
        }
    },
    {
        name: 'property_price_per_katha_text',
        placeholder: 'Per Katha Price Text',
        type: 'text',
        label: 'Per Katha / Flat Price Text',
    },
    {
        name: 'property_price_digit',
        placeholder: 'Total Price',
        type: 'text',
        label: 'Total Price',
        value: '',
        callback: function (e, value) {
            let el = document.querySelector('#property_price_text');
            let el2 = document.querySelector('#property_price_text_bangla');
            if (el && el2) {
                el.value = (window).convertAmount(value).en + ` taka only`;
                el2.value = (window).convertAmount(value).bn + ` টাকা মাত্র`;
            }
        }
    },

    {
        name: 'property_price_text',
        placeholder:
            'Total price (text)',
        type: 'text',
        label: 'Total Price (Text)',
    },
    {
        name: 'property_price_text_bangla',
        placeholder: 'Total price (bangla text)',
        type: 'text',
        label: 'Total Price (Bangla Text)',
    },
    // {
    //     name: 'payment_type',
    //     placeholder: 'Enter payment type',
    //     type: 'text',
    //     label: 'Payment Type (Booking/Down/Full)',
    // },

    // {
    //     name: 'check_cash_po_dd_no',
    //     placeholder:
    //         'Enter check / cash / P.O. / D.D. no.',
    //     type: 'text',
    //     label: 'Check / Cash / P.O. / D.D. No.',
    // },

]