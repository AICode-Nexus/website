export function getMeaningfulTeachingVideoCourseCount(catalog) {
  if (!Array.isArray(catalog?.courses)) {
    return 0;
  }

  return catalog.courses.filter(
    (course) => Number.isInteger(course?.episodeCount) && course.episodeCount > 1,
  ).length;
}

export function hasMeaningfulTeachingVideoCourseCatalog(catalog) {
  return getMeaningfulTeachingVideoCourseCount(catalog) > 0;
}
