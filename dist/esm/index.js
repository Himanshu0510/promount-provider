import React, { useState, useEffect, Component } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';

const DetailData = () => {
    let columns = [
        { field: "name", header: "Name", visible: true },
        { field: "email", header: "Email", visible: true },
        { field: "username", header: "Username", visible: true },
        { field: "website", header: "Web-Site", visible: true },
        { field: "company.name", header: "Company", visible: true },
        { field: "address.city", header: "City", visible: true },
    ];
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        username: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        "country.name": { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        email: { value: null, matchMode: FilterMatchMode.EQUALS },
        website: { value: null, matchMode: FilterMatchMode.IN },
        "address.city": { value: null, matchMode: FilterMatchMode.EQUALS },
    });
    const [visible, setVisible] = useState(false);
    const [globalFilterValue, setGlobalFilterValue] = useState("");
    const [selectedColumns, setSelectedColumns] = useState(columns);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    useEffect(() => {
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
        return (React.createElement("div", { className: "flex justify-content-end" },
            React.createElement("span", { className: "p-input-icon-left" },
                React.createElement("i", { className: "pi pi-search" }),
                React.createElement(InputText, { value: globalFilterValue, onChange: onGlobalFilterChange, placeholder: "Keyword Search" }))));
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
        return React.createElement(Column, { key: col.field, field: col.field, header: col.header });
    });
    if (error) {
        return React.createElement("div", null,
            "Error: ",
            error.message);
    }
    else if (!isLoaded) {
        return React.createElement("div", null, "Loading...");
    }
    else {
        return (React.createElement("div", { style: {
                backgroundColor: "#151c28 !important",
                color: "white !important",
            } },
            React.createElement(Dialog, { header: "Settings", visible: visible, style: { width: "50vw" }, onHide: () => setVisible(false) }),
            React.createElement(DataTable, { dataKey: "id", value: items, header: header, filters: filters, filterDisplay: "row", responsiveLayout: "scroll" },
                React.createElement(Column, { field: "id", header: "ID" }),
                React.createElement(Column, { field: "name", header: "Name", filter: true, filterPlaceholder: "Search by name", style: { minWidth: "12rem" } }),
                React.createElement(Column, { field: "email", header: "Email", filter: true, filterPlaceholder: "Search by Email", style: { minWidth: "12rem" } }),
                React.createElement(Column, { field: "username", header: "Username", filter: true, filterPlaceholder: "Search by Username", style: { minWidth: "12rem" } }),
                React.createElement(Column, { field: "website", header: "Web-Site", filter: true, filterPlaceholder: "Search by Web-Site", style: { minWidth: "12rem" } }),
                React.createElement(Column, { field: "company.name", header: "Company", filter: true, filterPlaceholder: "Search by Company", style: { minWidth: "12rem" } }),
                React.createElement(Column, { field: "address.city", header: "City", filter: true, filterPlaceholder: "Search by City", style: { minWidth: "12rem" } }))));
    }
};

class Label extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profileName: this.props.name,
        };
    }
    render() {
        return (React.createElement(React.Fragment, null,
            React.createElement("h2", null,
                "Welcome ",
                this.state.profileName,
                "!")));
    }
}

export { DetailData, Label };
//# sourceMappingURL=index.js.map
