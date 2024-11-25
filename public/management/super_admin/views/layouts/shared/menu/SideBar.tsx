/* eslint-disable no-undef */
import React from 'react';
import MenuDropDown from './MenuDropDown';
import MenuDropDownItem from './MenuDropDownItem';
import MenuSingle from './MenuSingle';
export interface Props { }

const SideBar: React.FC<Props> = (props: Props) => {
    setTimeout(() => {
        init_nav_action();
        active_link(window.location.href);
    }, 1000);

    return (
        <>
            <ul className="sidebar-menu">
                {/* Dashboard  */}
                <MenuSingle to="/" icon="icon-dashboard" label="Dashboard" />
                {/* HRM  */}
                <MenuDropDown
                    section_title="Management"
                    group_title="HRM"
                    icon="icon-desktop"
                >
                    <MenuDropDownItem label="All Marketting " to="/users?role=marketing" />
                    <MenuDropDownItem label="All Staffs" to="/users?role=staff" />
                    <MenuDropDownItem label="All Management" to="/users?role=management" />
                    <MenuDropDownItem label="All Customer" to="/users?role=customer" />
                    <MenuDropDownItem
                        label="Create User"
                        to="/users/create"
                    />
                    <MenuDropDownItem
                        label="Employee History"
                        to="/users/history"
                    />
                </MenuDropDown>
                {/* Booking  */}
                <MenuDropDown group_title="Projects" icon="icon-desktop">
                    <MenuDropDownItem label="All Projects" to="/project" />
                    <MenuDropDownItem label="Create Project" to="/project/create" />
                    <MenuDropDownItem label="All Bookings" to="/booking" />
                    <MenuDropDownItem label="Create Booking" to="/booking/create" />
                    <MenuDropDownItem label="Project Payment" to="/project_payment" />
                </MenuDropDown>
                {/* Account  */}
                <MenuDropDown group_title="Account" icon="icon-desktop">
                    <MenuDropDownItem label="Incomes" to="/accounts/incomes" />
                    <MenuDropDownItem label="Expenses" to="/accounts/expense" />
                    <MenuDropDownItem label="Expense Entry" to="/accounts/new-expense" />
                    <MenuDropDownItem label="All Account" to="/account_types" />
                    <MenuDropDownItem label="All Account Number" to="/account_numbers" />
                    <MenuDropDownItem label="All Account Categories" to="/account_categories" />
                    <MenuDropDownItem label="Debit Credit" to="/debit_credit" />
                </MenuDropDown>
                {/* Reports  */}
                {/* <MenuDropDown group_title="Reports" icon="icon-desktop">
                    <MenuDropDownItem label="Income Statement" to="/income_statement" />
                    <MenuDropDownItem label="Expense Statement" to="/expense_statement" />
                    <MenuDropDownItem label="Closing Balance" to="/closing_balance" />
                    <MenuDropDownItem label="Project Report" to="/project_report" />
                    <MenuDropDownItem label="Customer Report" to="/customer_report" />
                    <MenuDropDownItem label="Due Report" to="/due_report" />
                    <MenuDropDownItem label="Incentive Report" to="/incentive_report" />
                </MenuDropDown> */}
                {/* Project Visits  */}
                <MenuDropDown group_title="Project Visits" icon="icon-desktop">
                    <MenuDropDownItem label="Visit History" to="/assign_visit" />
                    <MenuDropDownItem label="Assign Visit" to="/visit_history" />
                </MenuDropDown>

                <li>
                    <a className="sidebar-header" href="/logout" onClick={(e) => {
                        e.preventDefault();
                        return (window as any).confirm('logout!!') &&
                            (document.getElementById('logout_form') as HTMLFormElement)?.submit();
                    }}>
                        <i className="icon-lock"></i>
                        <span> Logout</span>
                    </a>
                </li>

            </ul>
        </>
    );
};

function active_link(hash) {
    let url = new URL(hash);
    (window as any).jQuery(`.sidebar-submenu a`).removeClass('active');
    (window as any)
        .$(`.sidebar-submenu a[href="${url.hash}"]`)
        .addClass('active');
    (window as any)
        .$(`.sidebar-submenu a[href="${url.hash}"]`)
        .parent('li')
        .parent('ul').css({ display: 'block' }).addClass('menu-open')
        .parent('li').addClass('active')

}

function init_nav_action() {
    var animationSpeed = 300,
        subMenuSelector = '.sidebar-submenu';
    (window as any).jQuery('.sidebar-menu').on('click', 'li a', function (e) {
        var $this = (window as any).jQuery(this);
        var checkElement = $this.next();
        if (checkElement.is(subMenuSelector) && checkElement.is(':visible')) {
            checkElement.slideUp(animationSpeed, function () {
                checkElement.removeClass('menu-open');
            });
            checkElement.parent('li').removeClass('active');
        } else if (
            checkElement.is(subMenuSelector) &&
            !checkElement.is(':visible')
        ) {
            var parent = $this.parents('ul').first();
            var ul = parent.find('ul:visible').slideUp(animationSpeed);
            ul.removeClass('menu-open');
            var parent_li = $this.parent('li');
            checkElement.slideDown(animationSpeed, function () {
                checkElement.addClass('menu-open');
                parent.find('li.active').removeClass('active');
                parent_li.addClass('active');
            });
        }

        if (e.target && e.target.href && e.target.href.includes('http')) {
            active_link(e.target.href);
        }
    });
}

export default SideBar;
