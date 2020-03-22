import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';
import { DefaultResponse } from '../models/defaultResponse.model';
import { Comment } from '../models/comment.model';
import { Thread } from '../models/thread.model';

@Injectable({
    providedIn: 'root'
})
export class ForumService {

    constructor(
        private httpClient: HttpClient
    ) { }

    /**
     * Hilos
     */
    createThread = (thread: Thread) => {
        return this.httpClient.post(`${environment.WS_URL}/thread`, thread, this.appJsonHeader).toPromise()
    }

    deleteThread = (userId: number, options: { id?: number, title?: string }) => {
        let params = new HttpParams();
        params.append('userId', `${userId}`);
        if (options && options['id']) params = params.append('id', `${options['id']}`);
        if (options && options['title']) params = params.append('title', `${options['title']}`);
        return this.httpClient.delete(`${environment.WS_URL}/thread`, { params }).toPromise()
    }

    getThread = (options?: { id?: number, politicalPartyId?: number, searchQuery?: string, offset?: number, orderBy?: string }) => {
        let params = new HttpParams();
        if (options && options['id']) params = params.append('id', `${options['id']}`);
        if (options && options['politicalPartyId']) params = params.append('politicalPartyId', `${options['politicalPartyId']}`);
        if (options && options['searchQuery']) params = params.append('searchQuery', `${options['searchQuery']}`);
        if (options && options['offset']) params = params.append('offset', `${options['offset']}`);
        if (options && options['orderBy']) params = params.append('orderBy', `${options['orderBy']}`);
        return this.httpClient.get(`${environment.WS_URL}/thread`, { params }).toPromise()
    }

    /**
     * Comentarios
     */
    createPost = (comment: Comment) => {
        return this.httpClient.post(`${environment.WS_URL}/post`, comment, this.appJsonHeader).toPromise()
    }
    
    deletePost = (userId: number, options: { id?: number, title?: string }) => {
        let params = new HttpParams();
        params.append('userId', `${userId}`);
        if (options && options['id']) params = params.append('id', `${options['id']}`);
        if (options && options['title']) params = params.append('title', `${options['title']}`);
        return this.httpClient.delete(`${environment.WS_URL}/post`, { params }).toPromise()
    }

    getPost = (threadId?: number) => {
        let params = new HttpParams();
        if (threadId !== undefined) params = params.append('threadId', `${threadId}`);
        return this.httpClient.get(`${environment.WS_URL}/post`, { params }).toPromise()
    }

    /**
     * Utilidades privadas de Auth
     */
    private appJsonHeader = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json', })
    }

}
