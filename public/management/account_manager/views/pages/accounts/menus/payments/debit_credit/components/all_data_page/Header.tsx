import React from 'react';
import HeadSearch from './HeadSearch';
import HeadTitle from './HeadTitle';
import HeadRightButtons from './HeadRightButtons';
export interface Props {
    title?: string;
    search_handler?: (e) => void;
}

const Header: React.FC<Props> = (props: Props) => {
    return (
        <>
            <div className="action_bar">
                <div className="navigation">
                    {/* <ul>
                        <li className="search_li">
                            <HeadSearch></HeadSearch>
                        </li>
                    </ul> */}
                    <form onSubmit={props.search_handler} className="d-flex gap-2 align-items-center">
                        <input type="date" id="start_date" name="start_date" className="form-control" />
                        TO
                        <input type="date" id="end_date" name="end_date" className="form-control" />
                        <button className="btn btn-sm btn-outline-info">
                            <i className="fa fa-search"></i>
                        </button>
                    </form>
                </div>
                <HeadTitle title={props.title}></HeadTitle>
                <div className="control">
                    {/* <HeadRightButtons></HeadRightButtons> */}
                </div>
            </div>
        </>
    );
};

export default Header;
