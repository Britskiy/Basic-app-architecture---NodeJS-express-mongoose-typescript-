import mongoose = require("mongoose");

export interface IRead<T extends mongoose.Document> {
    retrieve: (callback: (error: any, result: any) => void) => void;
    findById: (id: string, callback: (error: any, result: T) => void) => void;
    findOne(conditions?: any, callback?: (err: any, res: T | null) => void): mongoose.DocumentQuery<T | null, T>;
    findOne(conditions: any, projection: any, callback?: (err: any, res: T | null) => void): mongoose.DocumentQuery<T | null, T>;
    findOne(conditions: any, projection: any, options: any, callback?: (err: any, res: T | null) => void): mongoose.DocumentQuery<T | null, T>;
  
    find(callback?: (err: any, res: T[]) => void): mongoose.DocumentQuery<T[], T>;
    find(conditions: any, callback?: (err: any, res: T[]) => void): mongoose.DocumentQuery<T[], T>;
    find(conditions: any, projection?: any | null,
      callback?: (err: any, res: T[]) => void): mongoose.DocumentQuery<T[], T>;
    find(conditions: any, projection?: any | null, options?: any | null,
      callback?: (err: any, res: T[]) => void): mongoose.DocumentQuery<T[], T>;
}

export interface IWrite<T extends mongoose.Document> {
    create: (item: T, callback: (error: any, result: any) => void) => void;
    update: (_id: mongoose.Types.ObjectId, item: T, callback: (error: any, result: any) => void) => void;
    delete: (_id: string, callback: (error: any, result: any) => void) => void;
}