import { Component } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree'
import { NestedTreeControl } from '@angular/cdk/tree';

export class FileNode {
  children!: FileNode[];
  fileName!: string;
  type: any;
}

const TREE_DATA: FileNode[] = [
  {
    fileName: "folder1",
    type: "",
    children: [
      {
        fileName: "test1",
        type: "exe",
        children: []
      },
      {
        fileName: "test2",
        type: "exe",
        children: []
      }
    ],
  },
  {
    fileName: "folder3",
    type: "",
    children: [
      {
        fileName: "test4",
        type: "exe",
        children: []
      },
      {
        fileName: "test5",
        type: "",
        children: [
          {
            fileName: "test6",
            type: "html",
            children: []
          },
          {
            fileName: "test7",
            type: "html",
            children: []
          }
        ]
      }
    ],
  }
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  nestedDataSource= new MatTreeNestedDataSource<FileNode>();
  nestedTreeControl = new NestedTreeControl<FileNode>(node => node.children);

  constructor() {
    this.nestedDataSource.data=TREE_DATA;
   }

   hasChild = (nr: number, nodeData: FileNode) => { return !(nodeData.type); };
  }
