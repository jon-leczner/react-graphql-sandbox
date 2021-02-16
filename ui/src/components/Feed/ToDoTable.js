import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';

class ToDoTable extends Component {
    state = {
        columnDefs: [
            {
                field: 'description',
                autoHeight: true,
            },
            {
                field: 'priority',
                cellEditor: 'agSelectCellEditor',
                cellEditorParams: {
                    values: ['Highest', 'High', 'Medium', 'Low', 'Lowest'],
                },
            },
            {
                field: 'dueDate',
            },
            {
                field: 'createdAt',
                editable: false,
            },
        ],
        defaultColumnDef: {
            editable: true,
            resizable: true,
        },
        getRowNodeId: (data) => data.id,
        gridOptions: {
            immutableData: true,
        },
        toDos: this.props.toDos,
    };

    onGridReady = (params) => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;

        this.gridApi.sizeColumnsToFit();
    };

    render() {
        const {
            columnDefs,
            defaultColumnDef,
            getRowNodeId,
            gridOptions,
        } = this.state;
        const { toDos } = this.props;

        return (
            <div
                className="ag-theme-material"
                style={{ height: 400, width: '100%' }}
            >
                <AgGridReact
                    columnDefs={columnDefs}
                    defaultColDef={defaultColumnDef}
                    getRowNodeId={getRowNodeId}
                    gridOptions={gridOptions}
                    onGridReady={this.onGridReady}
                    rowData={toDos}
                />
            </div>
        );
    }
}

export default ToDoTable;
