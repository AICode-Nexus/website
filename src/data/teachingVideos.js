import teachingVideoCatalogData from './teachingVideos.generated.json';
import {defineTeachingVideoCatalog} from '@site/src/utils/teachingVideos';

export const teachingVideoCatalog = defineTeachingVideoCatalog(teachingVideoCatalogData);
