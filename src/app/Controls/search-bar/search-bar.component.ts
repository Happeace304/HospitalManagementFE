import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  Input,
  OnChanges,
} from "@angular/core";
import { FormGroup } from "@angular/forms";
import UsersService from "src/app/Services/Users/users.service";

@Component({
  selector: "search-bar",
  templateUrl: "./search-bar.component.html",
  styleUrls: ["./search-bar.component.scss"],
})
export class SearchBarComponent implements OnInit, OnChanges {
  @Input() value;
  @Input() isDisabled;
  @Input() config;
  @Input() filterRange;
  @Input() parentForm: FormGroup;
  @Output() onSearchApply = new EventEmitter();
  @Output() onRemove = new EventEmitter();

  resource;
  datatableConfig;
  datatableData;
  searchText: string;
  modalId: string;
  constructor(public usersService: UsersService) {}
  ngOnChanges(changeObj) {
    if (changeObj?.value?.currentValue) {
      this.setText(this.value);
    }
  }
  ngOnInit(): void {
    this.initResource();
    this.initGridConfig();
  }

  initResource() {
    if (this.config.searchDoctor) {
      this.resource = {
        modalTitle: "Tìm bác sĩ",
        modalCancel: "Hủy",
        modalApply: "Xác nhận",
      };
    } else {
      this.resource = {
        modalTitle: "Tìm bệnh nhân",
        modalCancel: "Hủy",
        modalApply: "Xác nhận",
      };
    }

    this.resource.placeholder = `${this.resource.modalTitle}${
      this.config.required && "*"
    }`;

    this.modalId = `${this.config.controlName}_modalId`;
  }

  private initGridConfig() {
    if (this.config.searchDoctor) {
      let codeTables = [
        { title: "Khoa tim", value: "CARDIOLOGY" },
        { title: "Khoa da liễu", value: "DERMATOLOGY" },
        { title: "Khoa dinh dưỡng", value: "DIETETICS" },
      ];
      this.datatableConfig = {
        id: "doctorDatatableModalId",
        pageLength: 5,
        columns: [
          { data: "name", title: "Tên", type: "string" },
          { data: "phone", title: "SĐT", type: "string" },
          { data: "address", title: "Địa chỉ", type: "string" },
          {
            data: "department",
            title: "Khoa",
            type: "string",
            render: (obj) =>
              codeTables.find((codeTable) => codeTable.value === obj)?.title,
          },
          {
            data: "gender",
            title: "Giới tính",
            type: "string",
            render: (obj) => (obj === "1" ? "Nam" : "Nữ"),
          },
        ],
      };
    } else {
      this.datatableConfig = {
        id: "userDatatableModalId" + this.modalId,
        pageLength: 5,
        columns: [
          { data: "name", title: "Tên", type: "string" },
          { data: "birthday", title: "Ngày sinh", type: "string" },
          { data: "address", title: "Địa chỉ", type: "string" },
          {
            data: "gender",
            title: "Giới tính",
            type: "string",
            render: (obj) => (obj === "1" ? "Nam" : "Nữ"),
          },
          { data: "idCard", title: "CMND", type: "string" },
          { data: "medicalCard", title: "Số BHYT", type: "string" },
        ],
      };
    }
  }

  onSearchClick() {
    this.toggleModal();
    this.searchText = this.parentForm.get(this.config.controlName).value || "";
  }

  onSearchComplete() {
    let table = ($(`#${this.datatableConfig.id}`) as any).DataTable();
    let data = table.rows({ selected: true }).data();
    if (!data?.length) {
      return;
    }
    this.onSearchApply.emit({ data: data[0] });
    this.toggleModal();
  }

  onSearchCancel() {
    this.toggleModal();
  }

  onSearchRemove() {
    this.onRemove.emit();
  }

  setText(data) {
    this.parentForm.get(this.config.controlName).setValue(data);
  }

  private toggleModal() {
    let modal = $(`#${this.modalId}`) as any;
    let isShow = modal.hasClass("show");

    modal.modal("toggle");
    if (!isShow) {
      this.loadData(this.config.searchDoctor, this.filterRange);
    }
  }

  private loadData(isSearchDoctor?: boolean, filterAppointment?: any) {
    this.usersService.getAllUsers(isSearchDoctor, filterAppointment).subscribe(
      (response) => {
        this.datatableData = response;
      },
      (error) => {},
      () => {}
    );
  }
}
