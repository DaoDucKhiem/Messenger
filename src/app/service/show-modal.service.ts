import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShowModalService {

  constructor() { }

  /**
   * hiện modal
   * @param id 
   */
  showModal(id: string) {
    document.getElementById(id).style.display = 'flex';
  }

  /**
   * ẩn modal
   * @param id 
   */
  hideModal(id: string) {
    document.getElementById(id).style.display = 'none';
  }

}
