export function paginate(currentPage: number, itemsPerPage: number, dataArr: any[]) {
    const startIdx = (currentPage - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    const paginatedResults = dataArr.slice(startIdx, endIdx);

    return {
      currentPage,
      itemsPerPage,
      totalItems: dataArr.length,
      totalPages: Math.ceil(dataArr.length / itemsPerPage),
      success: true,
      data: paginatedResults,
    };
}