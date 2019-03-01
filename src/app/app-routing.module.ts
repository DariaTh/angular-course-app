import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { GalleryComponent } from "./gallery/gallery.component";
import { PostListComponent } from "./posts/posts-list/post-list.component";
import { PostCreateComponent } from "./posts/posts-create/post-create.component";

const routes: Routes = [
    { path: '', component: PostListComponent },
    { path: 'create', component: PostCreateComponent },
    { path: 'edit/:postId', component: PostCreateComponent },
    { path: 'galery', component: GalleryComponent },
    { path: 'posts', component: PostListComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}