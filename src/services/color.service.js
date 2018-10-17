
import Parse from 'parse';
import { paginateQuery } from 'parse-paginate-query';
import _ from 'lodash';

export const colorService = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

var Color = Parse.Object.extend('colors');

function getAll( params, offset, limit ) {
    if( offset == null || offset < 0 ) {
        offset = 0;
    }
    if( limit == null || limit < 0 ) {
        limit = 25;
    }
    let query = Parse.Query(Color);
    if( params != null && _.isObject( params) ) {
        for(prop in params) {
            query.equalTo(prop, params[prop]);
        }
    }
    query.skip(offset);
    query.limit(limit);
    query.descending('updatedAt');
    return paginateQuery(query);
}

function getById(id) {
    let query = Parse.Query(Color);
    return query.get(id);
}

function create(params) {
    let color = new Color();
    if( params != null ) {
        for(prop in params) {
            color.set(prop, params[prop]);
        }
    }
    return color.save();
}

function update(id, params) {
    getById(id)
    .then( (color) => {
        for(prop in params){
            color.set(prop, params[prop]);
        }
        return color.save();
    } )
    .catch( (error) => {
        return Promise.reject(error);
    });
}

function _delete(id) {
    getById(id)
    .then( (color) => {
        return color.destroy();
    } )
    .catch( (error) => {
        return Promise.reject(error);
    });
}