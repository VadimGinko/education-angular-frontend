/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { TaskDto } from '../models/task-dto';
import { TaskResourceDto } from '../models/task-resource-dto';

@Injectable({
  providedIn: 'root',
})
export class TaskControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getTask
   */
  static readonly GetTaskPath = '/api/v1/tasks/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTask()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTask$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<TaskDto>> {

    const rb = new RequestBuilder(this.rootUrl, TaskControllerService.GetTaskPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<TaskDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getTask$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTask(params: {
    id: number;
  }): Observable<TaskDto> {

    return this.getTask$Response(params).pipe(
      map((r: StrictHttpResponse<TaskDto>) => r.body as TaskDto)
    );
  }

  /**
   * Path part for operation updateTask
   */
  static readonly UpdateTaskPath = '/api/v1/tasks/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateTask()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateTask$Response(params: {
    id: number;
    body: TaskDto
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, TaskControllerService.UpdateTaskPath, 'put');
    if (params) {
      rb.path('id', params.id, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateTask$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateTask(params: {
    id: number;
    body: TaskDto
  }): Observable<void> {

    return this.updateTask$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation putVideoUpload
   */
  static readonly PutVideoUploadPath = '/api/v1/tasks/video/{taskId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `putVideoUpload()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  putVideoUpload$Response(params: {
    name: string;
    taskId: number;
    body?: {
'file': Blob;
}
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, TaskControllerService.PutVideoUploadPath, 'put');
    if (params) {
      rb.query('name', params.name, {});
      rb.path('taskId', params.taskId, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `putVideoUpload$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  putVideoUpload(params: {
    name: string;
    taskId: number;
    body?: {
'file': Blob;
}
  }): Observable<void> {

    return this.putVideoUpload$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation updateOrder
   */
  static readonly UpdateOrderPath = '/api/v1/tasks/update-order';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateOrder()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateOrder$Response(params: {
    body: Array<TaskDto>
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, TaskControllerService.UpdateOrderPath, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateOrder$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateOrder(params: {
    body: Array<TaskDto>
  }): Observable<void> {

    return this.updateOrder$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation createTask
   */
  static readonly CreateTaskPath = '/api/v1/tasks';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createTask()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createTask$Response(params: {
    body: TaskDto
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, TaskControllerService.CreateTaskPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createTask$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createTask(params: {
    body: TaskDto
  }): Observable<void> {

    return this.createTask$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postFileUpload
   */
  static readonly PostFileUploadPath = '/api/v1/tasks/{taskId}/file';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postFileUpload()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postFileUpload$Response(params: {
    name: string;
    taskId: number;
    body?: {
'file': Blob;
}
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, TaskControllerService.PostFileUploadPath, 'post');
    if (params) {
      rb.query('name', params.name, {});
      rb.path('taskId', params.taskId, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postFileUpload$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postFileUpload(params: {
    name: string;
    taskId: number;
    body?: {
'file': Blob;
}
  }): Observable<void> {

    return this.postFileUpload$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation createTaskLinks
   */
  static readonly CreateTaskLinksPath = '/api/v1/tasks/{id}/task-links';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createTaskLinks()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createTaskLinks$Response(params: {
    id: number;
    body: TaskResourceDto
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, TaskControllerService.CreateTaskLinksPath, 'post');
    if (params) {
      rb.path('id', params.id, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createTaskLinks$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createTaskLinks(params: {
    id: number;
    body: TaskResourceDto
  }): Observable<void> {

    return this.createTaskLinks$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postVideoUpload
   */
  static readonly PostVideoUploadPath = '/api/v1/tasks/video';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postVideoUpload()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postVideoUpload$Response(params: {
    name: string;
    courseId: number;
    body?: {
'file': Blob;
}
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, TaskControllerService.PostVideoUploadPath, 'post');
    if (params) {
      rb.query('name', params.name, {});
      rb.query('courseId', params.courseId, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postVideoUpload$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postVideoUpload(params: {
    name: string;
    courseId: number;
    body?: {
'file': Blob;
}
  }): Observable<void> {

    return this.postVideoUpload$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation provideUploadInfo
   */
  static readonly ProvideUploadInfoPath = '/api/v1/tasks/file/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `provideUploadInfo()` instead.
   *
   * This method doesn't expect any request body.
   */
  provideUploadInfo$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<Blob>> {

    const rb = new RequestBuilder(this.rootUrl, TaskControllerService.ProvideUploadInfoPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Blob>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `provideUploadInfo$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  provideUploadInfo(params: {
    id: number;
  }): Observable<Blob> {

    return this.provideUploadInfo$Response(params).pipe(
      map((r: StrictHttpResponse<Blob>) => r.body as Blob)
    );
  }

}
