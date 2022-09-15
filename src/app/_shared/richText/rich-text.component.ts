import { Component, Input, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { QuillConfiguration } from "./config";

@Component({
  selector: "rich-text",
  templateUrl: "./rich-text.component.html"
})
export class RichTextComponent implements OnInit {
  quillConfiguration = QuillConfiguration;
  @Input() control: FormControl;
  constructor() {}

  ngOnInit() {
    this.control = this.control ?? new FormControl();
  }
}