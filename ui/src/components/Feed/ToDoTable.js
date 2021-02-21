import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';

import ActionButtons from './ActionButtons';

class ToDoTable extends Component {
    state = {
        columnDefs: [
            {
                field: 'description',
                autoHeight: true,
                valueSetter: (params) => {
                    params.data.description = params.newValue;
                    return true;
                },
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
            {
                cellRenderer: 'actionButtonsRenderer',
                cellRendererParams: (params) => {
                    return {
                        toggleEdit: this.toggleEdit,
                        save: this.save,
                    };
                },
                editable: false,
            },
        ],
        defaultColumnDef: {
            editable: true,
            resizable: true,
        },
        gridOptions: {
            frameworkComponents: {
                actionButtonsRenderer: ActionButtons,
            },
            rowSelection: 'single',
        },
    };

    onGridReady = (params) => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;

        this.gridApi.sizeColumnsToFit();
    };

    toggleEdit = (node, isEditEnabled) => {
        if (isEditEnabled) {
            this.gridApi.stopEditing(true);
        } else {
            this.gridApi.startEditingCell({
                colKey: 'description',
                rowIndex: node.rowIndex,
            });
        }
    };

    save = (node) => {
        // graphql mutation to update toDo
        // refresh grid ?
        const data = node.data;
        console.log(data);
        this.gridApi.stopEditing();
    };

    render() {
        const { columnDefs, defaultColumnDef, gridOptions } = this.state;
        const { toDos } = this.props;

        return (
            <div
                className="ag-theme-material"
                style={{ height: 400, width: '100%' }}
            >
                <AgGridReact
                    columnDefs={columnDefs}
                    defaultColDef={defaultColumnDef}
                    editType={'fullRow'}
                    gridOptions={gridOptions}
                    onGridReady={this.onGridReady}
                    rowData={toDos}
                    suppressClickEdit={true}
                />
            </div>
        );
    }
}

export default ToDoTable;
