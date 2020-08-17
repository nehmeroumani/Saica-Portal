import React, { cloneElement } from 'react';
import { CircularProgress } from '@material-ui/core';
import { translate } from 'react-admin';
import compose from 'recompose/compose';
import httpClient from '../provider/httpClient';
import { Config } from '../config';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

class TweetAnnotations extends React.Component {
    state = {
        rows: null
    };

    componentDidMount() {
        this.fetchData(this.props.tweetId);
    }

    async fetchData(tweetId) {
        try {
            const { json: data } = await httpClient(`${Config.apiUrl}/api/tweet/${tweetId}/annotations`, {
                method: 'GET',
            });
            this.prepareRowsData(data);
        } catch (e) { }
    }

    prepareRowsData(data) {
        var rows = [];
        Object.getOwnPropertyNames(data.userAnnotations).map((userId, i) => {
            const backgroundColor = i / 2 ? 'transparent': '#FAFAFA';
            var row = {backgroundColor: backgroundColor};
            const currUserAnnotations = data.userAnnotations[userId];
            row["user"] = { id: userId, name: data.users[userId].name, rowSpan: currUserAnnotations.length };
            Object.getOwnPropertyNames(data.categories)
                .filter((cId) => currUserAnnotations.filter((a) => a.categoryId == cId).length > 0)
                .map((categoryId) => {
                    const categoryAnnotations = currUserAnnotations.filter((a) => a.categoryId == categoryId);
                    categoryAnnotations.map((annotation, i) => {
                        if (i > 0) {
                            row = {backgroundColor: backgroundColor};
                        }
                        if (i == 0) {
                            row["category"] = { id: categoryId, color:  data.categories[categoryId].color, name: data.categories[categoryId].name, rowSpan: categoryAnnotations.length };
                        }
                        row["subcategory"] = { id: annotation.dimensionId, color:  data.categories[categoryId].color, name: data.subCategories[annotation.dimensionId].name, rowSpan: 1 };
                        row["id"] = annotation.id;
                        rows.push(row);
                    });
                    row = {backgroundColor: backgroundColor};
                });
        });
        this.setState({ rows });
    }

    render() {
        const { rows } = this.state;
        return rows ?
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>User</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell>Sub-Category</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => {
                        return <TableRow style={{backgroundColor: row['backgroundColor']}} key={row['id']}>
                            {row.hasOwnProperty('user') ? <TableCell rowSpan={row['user'].rowSpan}>{row['user'].name}</TableCell> : null}
                            {row.hasOwnProperty('category') ? <TableCell rowSpan={row['category'].rowSpan}><span className='colored-label' style={{borderColor: row['category'].color}}>{row['category'].name}</span></TableCell> : null}
                            {row.hasOwnProperty('subcategory') ? <TableCell rowSpan={row['subcategory'].rowSpan}><span className='colored-label' style={{borderColor: row['subcategory'].color}}>{row['subcategory'].name}</span></TableCell> : null}
                        </TableRow>
                    })}
                </TableBody>
            </Table>
            : <CircularProgress />;
    }
}

export default compose(
    translate
)(TweetAnnotations);