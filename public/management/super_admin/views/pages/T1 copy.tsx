import React, { useEffect } from 'react';
export interface Props { }

const T1: React.FC<Props> = (props: Props) => {
    useEffect(() => {
        init_chart();
    }, [])

    return <div className="container">
        <div className="row my-4">
            <div className="col-xl-3 col-lg-4">
                <div className="card" data-intro="This is card">
                    <div className="business-top-widget card-body">
                        <div className="media d-inline-flex">
                            <div className="media-body">
                                <span className="mb-2">Growth</span>
                                <h2 className="total-value m-0 counter">8900</h2>
                            </div>
                            <i className="icofont icofont-growth font-info align-self-center"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-xl-3 col-lg-4">
                <div className="card">
                    <div className="business-top-widget card-body">
                        <div className="media d-inline-flex">
                            <div className="media-body">
                                <span className="mb-2">Income</span>
                                <h2 className="total-value m-0 counter">7800</h2>
                            </div>
                            <i className="icofont icofont-money font-primary align-self-center"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-xl-3 col-lg-4">
                <div className="card">
                    <div className="business-top-widget card-body">
                        <div className="media d-inline-flex">
                            <div className="media-body">
                                <span className="mb-2">Project</span>
                                <h2 className="total-value m-0 counter">654</h2>
                            </div>
                            <i className="icofont icofont-presentation-alt font-secondary align-self-center"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-xl-3 col-lg-4">
                <div className="card">
                    <div className="business-top-widget card-body">
                        <div className="media d-inline-flex">
                            <div className="media-body">
                                <span className="mb-2">Customer</span>
                                <h2 className="total-value m-0 counter">8963</h2>
                            </div>
                            <i className="icofont icofont-business-man font-danger align-self-center"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="row my-4">
            <div className="col-12">
                <h3>Todays Collection</h3>
            </div>
            <div className="col-xl-3 col-lg-4">
                <div className="card" data-intro="This is card">
                    <div className="business-top-widget card-body">
                        <div className="media d-inline-flex">
                            <div className="media-body">
                                <span className="mb-2">Booking Money</span>
                                <h2 className="total-value m-0 counter">8900</h2>
                            </div>
                            <i className="icofont icofont-growth font-info align-self-center"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-xl-3 col-lg-4">
                <div className="card">
                    <div className="business-top-widget card-body">
                        <div className="media d-inline-flex">
                            <div className="media-body">
                                <span className="mb-2">Down Payment</span>
                                <h2 className="total-value m-0 counter">7800</h2>
                            </div>
                            <i className="icofont icofont-chart-bar-graph font-primary align-self-center"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-xl-3 col-lg-4">
                <div className="card">
                    <div className="business-top-widget card-body">
                        <div className="media d-inline-flex">
                            <div className="media-body">
                                <span className="mb-2">Installment</span>
                                <h2 className="total-value m-0 counter">654</h2>
                            </div>
                            <i className="icofont icofont-chart-histogram font-secondary align-self-center"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-xl-3 col-lg-4">
                <div className="card">
                    <div className="business-top-widget card-body">
                        <div className="media d-inline-flex">
                            <div className="media-body">
                                <span className="mb-2">Due</span>
                                <h2 className="total-value m-0 counter">8963</h2>
                            </div>
                            <i className="icofont icofont-chart-pie font-danger align-self-center"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="row my-2">
            <div className="col-12">
                <div className="card">
                    <div className="card-header">
                        <h3>
                            Income chart (
                            <span style={{ backgroundColor: '#d70206' }} className="p-2 ml-2"></span> booking money,
                            <span style={{ backgroundColor: '#f05b4f' }} className="p-2 ml-2"></span> down payment,
                            <span style={{ backgroundColor: '#f4c63d' }} className="p-2 ml-2"></span> installment
                            )
                        </h3>
                    </div>
                    <div className="card-body">
                        <div id="my_chart" className="scatter-chart flot-chart-container"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>;
};

function init_chart() {
    function randomInRange(min, max) {
        return Math.floor(Math.random() * max) + min;
    }

    function randomArray(meta = "booking money", min = 10000, max = 99999, count = 7) {
        let array = [];
        for (let i = 0; i < count; i++) {
            array.push({ meta, value: randomInRange(min, max) });
            // array.push(randomInRange(min, max));
        }
        return array;
    }
    new Chartist.LineChart('#my_chart', {
        labels: [
            "17/tue",
            "18/wed",
            "19/thu",
            "20/fri",
            "21/sat",
            "22/sun",
            "23/mon",
        ],
        series: [
            randomArray('booking money'),
            randomArray('down payment'),
            randomArray('installment'),
        ]
    }, {
        fullWidth: true,
        plugins: [
            new Chartist.plugins.tooltip({
                class: 'chart_tool_tip',
            })
        ]
    });
}

export default T1;
