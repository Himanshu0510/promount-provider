'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var datatable = require('primereact/datatable');
var column = require('primereact/column');
var api = require('primereact/api');
var inputtext = require('primereact/inputtext');
var dialog = require('primereact/dialog');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const DetailData = () => {
    let columns = [
        { field: "name", header: "Name", visible: true },
        { field: "email", header: "Email", visible: true },
        { field: "username", header: "Username", visible: true },
        { field: "website", header: "Web-Site", visible: true },
        { field: "company.name", header: "Company", visible: true },
        { field: "address.city", header: "City", visible: true },
    ];
    const [filters, setFilters] = React.useState({
        global: { value: null, matchMode: api.FilterMatchMode.CONTAINS },
        username: { value: null, matchMode: api.FilterMatchMode.STARTS_WITH },
        name: { value: null, matchMode: api.FilterMatchMode.STARTS_WITH },
        "country.name": { value: null, matchMode: api.FilterMatchMode.STARTS_WITH },
        email: { value: null, matchMode: api.FilterMatchMode.EQUALS },
        website: { value: null, matchMode: api.FilterMatchMode.IN },
        "address.city": { value: null, matchMode: api.FilterMatchMode.EQUALS },
    });
    const [visible, setVisible] = React.useState(false);
    const [globalFilterValue, setGlobalFilterValue] = React.useState("");
    const [selectedColumns, setSelectedColumns] = React.useState(columns);
    const [error, setError] = React.useState(null);
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [items, setItems] = React.useState([]);
    React.useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then((res) => res.json())
            .then((result) => {
            setIsLoaded(true);
            setItems(result);
        }, (error) => {
            setIsLoaded(true);
            setError(error);
        });
    }, []);
    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = Object.assign({}, filters);
        _filters["global"].value = value;
        setFilters(_filters);
        setGlobalFilterValue(value);
    };
    const renderHeader = () => {
        return (React__default["default"].createElement("div", { className: "flex justify-content-end" },
            React__default["default"].createElement("span", { className: "p-input-icon-left" },
                React__default["default"].createElement("i", { className: "pi pi-search" }),
                React__default["default"].createElement(inputtext.InputText, { value: globalFilterValue, onChange: onGlobalFilterChange, placeholder: "Keyword Search" }))));
    };
    const header = renderHeader();
    // const header = (
    //   <div style={{ textAlign: "left" }}>
    //     <Button
    //       label="Setting"
    //       icon="pi pi-cog"
    //       onClick={() => setVisible(true)}
    //     />
    //     <MultiSelect
    //       value={selectedColumns}
    //       options={columns}
    //       optionLabel="header"
    //       onChange={onColumnToggle}
    //       style={{ width: "20em" }}
    //     />
    //   </div>
    // );
    selectedColumns.map((col) => {
        return React__default["default"].createElement(column.Column, { key: col.field, field: col.field, header: col.header });
    });
    if (error) {
        return React__default["default"].createElement("div", null,
            "Error: ",
            error.message);
    }
    else if (!isLoaded) {
        return React__default["default"].createElement("div", null, "Loading...");
    }
    else {
        return (React__default["default"].createElement("div", { style: {
                backgroundColor: "#151c28 !important",
                color: "white !important",
            } },
            React__default["default"].createElement(dialog.Dialog, { header: "Settings", visible: visible, style: { width: "50vw" }, onHide: () => setVisible(false) }),
            React__default["default"].createElement(datatable.DataTable, { dataKey: "id", value: items, header: header, filters: filters, filterDisplay: "row", responsiveLayout: "scroll" },
                React__default["default"].createElement(column.Column, { field: "id", header: "ID" }),
                React__default["default"].createElement(column.Column, { field: "name", header: "Name", filter: true, filterPlaceholder: "Search by name", style: { minWidth: "12rem" } }),
                React__default["default"].createElement(column.Column, { field: "email", header: "Email", filter: true, filterPlaceholder: "Search by Email", style: { minWidth: "12rem" } }),
                React__default["default"].createElement(column.Column, { field: "username", header: "Username", filter: true, filterPlaceholder: "Search by Username", style: { minWidth: "12rem" } }),
                React__default["default"].createElement(column.Column, { field: "website", header: "Web-Site", filter: true, filterPlaceholder: "Search by Web-Site", style: { minWidth: "12rem" } }),
                React__default["default"].createElement(column.Column, { field: "company.name", header: "Company", filter: true, filterPlaceholder: "Search by Company", style: { minWidth: "12rem" } }),
                React__default["default"].createElement(column.Column, { field: "address.city", header: "City", filter: true, filterPlaceholder: "Search by City", style: { minWidth: "12rem" } }))));
    }
};

class Label extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profileName: this.props.name,
        };
    }
    render() {
        return (React__default["default"].createElement(React__default["default"].Fragment, null,
            React__default["default"].createElement("h2", null,
                "Welcome ",
                this.state.profileName,
                "!")));
    }
}

exports.DetailData = DetailData;
exports.Label = Label;
//# sourceMappingURL=index.js.map
