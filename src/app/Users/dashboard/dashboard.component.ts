import { Component, OnInit } from "@angular/core";
import UsersService from "src/app/Services/Users/users.service";

@Component({
  selector: "user-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class UserDashboardComponent implements OnInit {
  datatableConfig;
  datatableData;
  resource;
  constructor(public usersService: UsersService) {}

  ngOnInit(): void {
    this.initResource();
    this.initGridConfig();
    this.loadData();
  }

  private initResource() {
    this.resource = {
      stateTitle: "Quản lý người",
      addButton: { title: "Thêm người", routerLink: "../users/add" },
    };
  }

  private loadData() {
    this.usersService.getAllUsers().subscribe(
      (response) => {
        this.datatableData = response.user;
      },
      (error) => {},
      () => {}
    );
  }

  private initGridConfig() {
    this.datatableConfig = {
      id: "userDatatableId",
      columns: [
        { data: "email", title: "Email", type: "string" },
        { data: "name", title: "Tên", type: "string" },
        { data: "address", title: "Địa chỉ", type: "string" },
        { data: "birthday", title: "Ngày sinh", type: "Date" },
        { data: "id_card_number", title: "CMND", type: "string" },
        { data: "medical_card_number", title: "Số BHYT", type: "string" },
        {
          data: "email",
          title: "Sửa",
          render: (obj) => {
            return `<i class="fas fa-edit"></i>`;
          },
        },
      ],
    };
  }
}
