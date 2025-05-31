import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMeasurementType } from 'src/interfaces/imeasurementType';

@Injectable({ providedIn: 'root' })
export class MeasurementTypeService {
  private apiUrl = 'https://localhost:7048/api/MeasurementType';

  constructor(private http: HttpClient) {}

  getAll(): Observable<IMeasurementType[]> {
    return this.http.get<IMeasurementType[]>(this.apiUrl);
  }

  getById(id: number): Observable<IMeasurementType> {
    return this.http.get<IMeasurementType>(`${this.apiUrl}/GetById?id=${id}`);
  }

  create(measurementType: IMeasurementType): Observable<IMeasurementType> {
    return this.http.post<IMeasurementType>(this.apiUrl, measurementType);
  }

  update(id: number, measurementType: IMeasurementType): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}?id=${id}`, measurementType);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}?id=${id}`);
  }
}
