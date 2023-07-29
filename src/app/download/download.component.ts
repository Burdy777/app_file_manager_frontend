import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss']
})
export class DownloadComponent {

  files: string[] = [];

  constructor(private http: HttpClient) {
    this.getFilesList();
  }

  getFilesList(): void {
    this.http.get<any[]>("http://localhost:3000/api/files").subscribe(
      files => {
        this.files = files;
      },
      error => {
        console.error('Erreur lors de la récupération de la liste des fichiers', error);
      }
    );
  }

  onDownload(filename: string): void {
    console.log(filename)
    this.http.get(`http://localhost:3000/download/${filename}`, { responseType: 'blob' }).subscribe(
      blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error => {
        console.error('Erreur lors du téléchargement du fichier', error);
      }
    );
  }
}
