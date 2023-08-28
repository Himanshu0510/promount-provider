import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";

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
  const [error, setError] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [items, setItems] = useState<any>([]);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then(
        (result: any) => {
          setIsLoaded(true);
          setItems(result);
        },
        (error: any) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);
  const onGlobalFilterChange = (e: any) => {
    const value = e.target.value;
    let _filters = { ...filters };
    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-content-end">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Keyword Search"
          />
        </span>
      </div>
    );
  };
  const header = renderHeader();

  const onColumnToggle = (event: any) => {
    let selectedColumns = event.value;
    let orderedSelectedColumns = columns.filter((col) =>
      selectedColumns.some((sCol: any) => sCol.field === col.field)
    );
    setSelectedColumns(orderedSelectedColumns);
  };
  const checkboxChange = (event: any, index: any) => {
    console.log(event);
  };
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

  const columnComponents = selectedColumns.map((col) => {
    return <Column key={col.field} field={col.field} header={col.header} />;
  });

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div
        style={{
          backgroundColor: "#151c28 !important",
          color: "white !important",
        }}
      >
        <Dialog
          header="Settings"
          visible={visible}
          style={{ width: "50vw" }}
          onHide={() => setVisible(false)}
        >
          {/* <ul>
            {selectedColumns.map(function (e, index) {
              return (
                <li key={index}>
                  {e.header}
                  <Checkbox
                    style={{ marginRight: "10px" }}
                    onChange={(e) => checkboxChange(e, index)}
                  ></Checkbox>
                </li>
              );
            })}
          </ul> */}
        </Dialog>
        <DataTable
          dataKey="id"
          value={items}
          header={header}
          filters={filters}
          filterDisplay="row"
          responsiveLayout="scroll"
        >
          <Column field="id" header="ID"></Column>
          {/* {columnComponents} */}
          <Column
            field="name"
            header="Name"
            filter
            filterPlaceholder="Search by name"
            style={{ minWidth: "12rem" }}
          ></Column>
          <Column
            field="email"
            header="Email"
            filter
            filterPlaceholder="Search by Email"
            style={{ minWidth: "12rem" }}
          ></Column>
          <Column
            field="username"
            header="Username"
            filter
            filterPlaceholder="Search by Username"
            style={{ minWidth: "12rem" }}
          ></Column>
          <Column
            field="website"
            header="Web-Site"
            filter
            filterPlaceholder="Search by Web-Site"
            style={{ minWidth: "12rem" }}
          ></Column>
          <Column
            field="company.name"
            header="Company"
            filter
            filterPlaceholder="Search by Company"
            style={{ minWidth: "12rem" }}
          ></Column>
          <Column
            field="address.city"
            header="City"
            filter
            filterPlaceholder="Search by City"
            style={{ minWidth: "12rem" }}
          ></Column>
        </DataTable>
      </div>
    );
  }
};

export default DetailData;
