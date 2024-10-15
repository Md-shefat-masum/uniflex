export default function (conditions = {
    readonly: false,
}) {

    return [
        {
            name: 'payment_date',
            placeholder: 'Select date',
            type: 'date',
            label: 'Payment Date',
            readonly: false,
        },
        {
            name: 'have_to_pay_amount',
            placeholder: 'Have to pay amount',
            type: 'text',
            label: 'Have to pay amount',
            readonly: conditions.readonly,
            callback: function (e, value) {
                let el = document.querySelector('#have_to_pay_amount_text');
                if (el) {
                    el.value = (window).convertAmount(value).en + ` taka only`;
                }
            }
        },
        {
            name: 'have_to_pay_amount_text',
            placeholder: 'Have to pay amount in text',
            type: 'text',
            label: 'Have to pay amount in text',
            readonly: conditions.readonly,
        },
        {
            name: 'have_to_pay_amount_text_bn',
            placeholder: 'Have to pay amount in text Bangla',
            type: 'text',
            label: 'Have to pay amount in text Bangla',
            readonly: conditions.readonly,
        },
        {
            name: 'payment_digit',
            placeholder:
                'Enter payment (digit)',
            type: 'number',
            label: 'Payment (Digit)',
            readonly: conditions.readonly,
            callback: function (e, value) {
                let el = document.querySelector('#payment_text');
                let el2 = document.querySelector('#payment_text_bangla');
                if (el && el2) {
                    el.value = (window).convertAmount(value).en + ` taka only`;
                    el2.value = (window).convertAmount(value).bn + ` টাকা মাত্র`;
                }
            }
        },
        {
            name: 'payment_text',
            placeholder: 'Enter payment (text)',
            type: 'text',
            label: 'Payment (Text)',
            readonly: conditions.readonly,
        },
        {
            name: 'payment_text_bangla',
            placeholder: 'Enter payment (bangla text)',
            type: 'text',
            label: 'Payment ( Bangla Text)',
            readonly: conditions.readonly,
        },
        {
            name: 'office_only_money_receipt_no',
            placeholder: 'Payment Reciept No',
            type: 'text',
            label: 'Payment Reciept No',
            readonly: conditions.readonly,
        },

    ]
}