import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, Injectable } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { BehaviorSubject } from 'rxjs';
import { INewProducts } from '../../models/INewProducts';
import { ComponentService } from '../../Services/component.service';

/**
 * Node for to-do item
 */
 export class TodoItemNode {
  children!: TodoItemNode[];
  item!: string;
}

/** Flat to-do item node with expandable and level information */
export class TodoItemFlatNode {
  item!: string;
  level!: number;
  expandable!: boolean;
}

/**
 * The Json object for to-do list data.
 */
const TREE_DATA = {
  NewProducts: [
    'In progress'
  ],
  Chairs: {
    'Office Chairs': null,
    'Kitchen Chairs': null,
    Stools: ['Bar Stools', 'Hallway Stools'],
    "Garden Chairs": null,
    "conference chairs": null
  },
  Tables: [
    'Coffee Tables',
    'Kitchen Tables',
    'Comfortables Tv',
    "Bar Tables",
    "Nightstands"
  ],
  Couches: [
    'Cubicles',
    'Set of Sofas + Armchairs',
    'U-shaped Sofas'
  ],
  Beds: [
    'Double Beds',
    'Beds for one person',
    'Folding Beds'
  ],
  "Cabinets and Furniture": [
    'Bureau',
    'Wardrobes',
    'Slipper Cabinets',
    'Bathroom Cabinets',
    'Kitchen Cabinets',
    'Libraries',
    'Showcases'
  ],
  Seats: [
    'Tensiles',
    'Swigns',
    'Rotarys',
    'With Legs',
    'Made of Fabric',
    'For TV',
    'With Massage',
    'With High Back'
  ],
  StorageSystems: [
    'Mobile Living Sets',
    'Hallway Mobile Sets',
    'Office Furniture Sets',
    'Complete Bedrooms',
    'Kitchen Models'
  ]
};

/**
 * Checklist database, it can build a tree structured Json object.
 * Each node in Json object represents a to-do item or a category.
 * If a node is a category, it has children items and new items can be added under the category.
 */
@Injectable()
export class ChecklistDatabase {
  dataChange = new BehaviorSubject<TodoItemNode[]>([]);

  get data(): TodoItemNode[] { return this.dataChange.value; }

  constructor() {
    this.initialize();
  }

  initialize() {
    const data = this.buildFileTree(TREE_DATA, 0);

    this.dataChange.next(data);
  }

  buildFileTree(obj: {[key: string]: any}, level: number): TodoItemNode[] {
    return Object.keys(obj).reduce<TodoItemNode[]>((accumulator, key) => {
      const value = obj[key];
      const node = new TodoItemNode();
      node.item = key;

      if (value != null) {
        if (typeof value === 'object') {
          node.children = this.buildFileTree(value, level + 1);
        } else {
          node.item = value;
        }
      }

      return accumulator.concat(node);
    }, []);
  }

  /** Add an item to to-do list */
  // insertItem(parent: TodoItemNode, name: string) {
  //   if (parent.children) {
  //     parent.children.push({item: name} as TodoItemNode);
  //     this.dataChange.next(this.data);
  //   }
  // }

   insertItem(parent: TodoItemNode, name: string) {
     const child = <TodoItemNode>{ item: name };
     if (parent.children) { // parent already has children
       parent.children.push(child);
       this.dataChange.next(this.data);
     }
     else { // if parent is a leaf node
         parent.children = [];
       parent.children.push(child);
       this.dataChange.next(this.data);
     }
   }

  updateItem(node: TodoItemNode, name: string) {
    node.item = name;
    this.dataChange.next(this.data);
  }

  // public deleteItem(parent: TodoItemNode, item: string): void {

  //   if (parent.children) {
  //     parent.children = parent.children.filter(c => c.item !== item);
  //     this.dataChange.next(this.data);
  //   }

  // }
}

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css'],
  providers: [ChecklistDatabase]
})

export class TreeComponent {

  newProducts!: Array<INewProducts>;

   /** Map from flat node to nested node. This helps us finding the nested node to be modified */
  flatNodeMap = new Map<TodoItemFlatNode, TodoItemNode>();

  /** Map from nested node to flattened node. This helps us to keep the same object for selection */
  nestedNodeMap = new Map<TodoItemNode, TodoItemFlatNode>();

  treeControl: FlatTreeControl<TodoItemFlatNode>;

  treeFlattener: MatTreeFlattener<TodoItemNode, TodoItemFlatNode>;

  dataSource: MatTreeFlatDataSource<TodoItemNode, TodoItemFlatNode>;

  Category = '';
  categoryFilter = '';
  Sort = '';
  sortDirection = 'asc';

  constructor(private database: ChecklistDatabase,
              private componentService: ComponentService) {

    this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel, this.isExpandable, this.getChildren);
    this.treeControl = new FlatTreeControl<TodoItemFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    database.dataChange.subscribe(data => {
      this.dataSource.data = data;
    });
  }

  ngOnInit(): void {
    this.componentService.getAllProductsForNewProducts().subscribe(
      data => {
        this.newProducts = data;
        console.log(data);
      } , error => {
        console.log(error);
      }
    )
  }

  CategoryFilter() {
    this.categoryFilter = this.Category;
  }

  CategoryFilterClear() {
    this.categoryFilter = '';
    this.Category = '';
  }

  SortDirection() {
    if (this.sortDirection === 'desc') {
      this.sortDirection = 'asc';
    } else {
      this.sortDirection = 'desc';
    }
  }

  getLevel = (node: TodoItemFlatNode) => node.level;

  isExpandable = (node: TodoItemFlatNode) => node.expandable;

  getChildren = (node: TodoItemNode): TodoItemNode[] => node.children;

  hasChild = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.expandable;

  hasNoContent = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.item === '';

  /**
   * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
   */
  transformer = (node: TodoItemNode, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode = existingNode && existingNode.item === node.item
        ? existingNode
        : new TodoItemFlatNode();
    flatNode.item = node.item;
    flatNode.level = level;
    flatNode.expandable = !!node.children?.length;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  }

  addNewItem(node: TodoItemFlatNode) {
    const parentNode = this.flatNodeMap.get(node);
    let isParentHasChildren: boolean = false;

    if (parentNode?.children){
      isParentHasChildren = true;
    }
    this.database.insertItem(parentNode!, '');

    if (isParentHasChildren){
      this.treeControl.expand(node);
    }
  }

  saveNode(node: TodoItemFlatNode, itemValue: string) {
    const nestedNode = this.flatNodeMap.get(node);
    this.database.updateItem(nestedNode!, itemValue);
  }

  removeItem(node: TodoItemFlatNode) {
    let flatNode = this.dataSource.data[0].children;

    for (let i = flatNode.length - 1; i >= 0; i--) {
      if (flatNode[i].item === node.item) {
        this.database.dataChange.value[0].children.splice(i, 1);
        this.flatNodeMap.delete(node);
        this.database.dataChange.next(this.database.data);
      }
    }
  }
}

  // public deleteItem(node: TodoItemFlatNode): void {
  //   const isParent = this.getChildren.length;
  //   // Get the parent node of the selected child node
  //   const parentNode = this.getParentNode(node);

  //   // Map from flat node to nested node.
  //   const parentFlat = this.flatNodeMap.get(parentNode);

  //   this.database.deleteItem(parentFlat!, node.item);
  //   this.treeControl.expand(node);

  // }

  //  getParentNode(node: TodoItemFlatNode) {
  //    const parent = this.getChildren.length;
  //    if(parent == 0)
  //    {
  //      return node;
  //    }
  //  }
