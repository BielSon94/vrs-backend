import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {

    constructor(
        @Inject(SearchService) private searchService: SearchService,
    ) {}

    @Get()
    async filterRoute(@Query() params) {
        const from = params.from;
        const to = params.to;
        const arrival_date = params.arrival_date;

        return await this.searchService.filterRoute(from, to, arrival_date);
    }
}
