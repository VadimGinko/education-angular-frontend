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

import { CodeAnswerDto } from '../models/code-answer-dto';
import { TaskProgressDto } from '../models/task-progress-dto';

@Injectable({
  providedIn: 'root',
})
export class TaskProgressControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getTaskProgressByFilters
   */
  static readonly GetTaskProgressByFiltersPath = '/api/v1/task-progress';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTaskProgressByFilters()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTaskProgressByFilters$Response(params?: {
    taskId?: number;
    courseId?: number;
  }): Observable<StrictHttpResponse<Array<TaskProgressDto>>> {

    const rb = new RequestBuilder(this.rootUrl, TaskProgressControllerService.GetTaskProgressByFiltersPath, 'get');
    if (params) {
      rb.query('taskId', params.taskId, {});
      rb.query('courseId', params.courseId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<TaskProgressDto>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getTaskProgressByFilters$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTaskProgressByFilters(params?: {
    taskId?: number;
    courseId?: number;
  }): Observable<Array<TaskProgressDto>> {

    return this.getTaskProgressByFilters$Response(params).pipe(
      map((r: StrictHttpResponse<Array<TaskProgressDto>>) => r.body as Array<TaskProgressDto>)
    );
  }

  /**
   * Path part for operation updateTaskProgress
   */
  static readonly UpdateTaskProgressPath = '/api/v1/task-progress';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateTaskProgress()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateTaskProgress$Response(params: {
    body: TaskProgressDto
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, TaskProgressControllerService.UpdateTaskProgressPath, 'put');
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
   * To access the full response (for headers, for example), `updateTaskProgress$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateTaskProgress(params: {
    body: TaskProgressDto
  }): Observable<void> {

    return this.updateTaskProgress$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation updateTaskProgressByProgressId
   */
  static readonly UpdateTaskProgressByProgressIdPath = '/api/v1/task-progress/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateTaskProgressByProgressId()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateTaskProgressByProgressId$Response(params: {
    id: number;
    body: TaskProgressDto
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, TaskProgressControllerService.UpdateTaskProgressByProgressIdPath, 'put');
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
   * To access the full response (for headers, for example), `updateTaskProgressByProgressId$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateTaskProgressByProgressId(params: {
    id: number;
    body: TaskProgressDto
  }): Observable<void> {

    return this.updateTaskProgressByProgressId$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getCodeAnswerByProgressId
   */
  static readonly GetCodeAnswerByProgressIdPath = '/api/v1/task-progress/{id}/code';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCodeAnswerByProgressId()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCodeAnswerByProgressId$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<CodeAnswerDto>> {

    const rb = new RequestBuilder(this.rootUrl, TaskProgressControllerService.GetCodeAnswerByProgressIdPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CodeAnswerDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getCodeAnswerByProgressId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCodeAnswerByProgressId(params: {
    id: number;
  }): Observable<CodeAnswerDto> {

    return this.getCodeAnswerByProgressId$Response(params).pipe(
      map((r: StrictHttpResponse<CodeAnswerDto>) => r.body as CodeAnswerDto)
    );
  }

  /**
   * Path part for operation addCodeAnswer
   */
  static readonly AddCodeAnswerPath = '/api/v1/task-progress/{id}/code';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addCodeAnswer()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addCodeAnswer$Response(params: {
    id: number;
    body: CodeAnswerDto
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, TaskProgressControllerService.AddCodeAnswerPath, 'post');
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
   * To access the full response (for headers, for example), `addCodeAnswer$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addCodeAnswer(params: {
    id: number;
    body: CodeAnswerDto
  }): Observable<void> {

    return this.addCodeAnswer$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getPercent
   */
  static readonly GetPercentPath = '/api/v1/task-progress/{courseId}/p';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPercent()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPercent$Response(params: {
    courseId: number;
  }): Observable<StrictHttpResponse<number>> {

    const rb = new RequestBuilder(this.rootUrl, TaskProgressControllerService.GetPercentPath, 'get');
    if (params) {
      rb.path('courseId', params.courseId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: parseFloat(String((r as HttpResponse<any>).body)) }) as StrictHttpResponse<number>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getPercent$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPercent(params: {
    courseId: number;
  }): Observable<number> {

    return this.getPercent$Response(params).pipe(
      map((r: StrictHttpResponse<number>) => r.body as number)
    );
  }

}
