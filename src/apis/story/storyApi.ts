import api from '@/apis/axios';
import ENDPOINTS from '@/utils/endPoints';
import type {
  BaseSuccessResponse,
  PaginationParams,
} from '@/types/api/CommonTypes';
import type {
  GetAllStoriesResponse,
  Story,
  StoryCreate,
  StoryUpdate,
} from '@/types/api/storyTypes';

const storyApi = {
  getAll: async (params?: PaginationParams): Promise<GetAllStoriesResponse> => {
    const response = await api.get<GetAllStoriesResponse>(
      ENDPOINTS.stories.getAll,
      {
        params,
      }
    );
    return response.data;
  },

  getById: async (id: number): Promise<Story> => {
    const response = await api.get<Story>(ENDPOINTS.stories.getById(id));
    return response.data;
  },

  create: async (data: StoryCreate): Promise<Story> => {
    const response = await api.post<Story>(ENDPOINTS.stories.create, data);
    return response.data;
  },

  update: async (id: number, data: StoryUpdate): Promise<Story> => {
    // 1. Try POST with query param ?_method=PATCH (bypasses CORS preflight PATCH/PUT block & triggers method-override)
    try {
      const response = await api.post<Story>(
        `${ENDPOINTS.stories.update(id)}?_method=PATCH`,
        data
      );
      return response.data;
    } catch {
      // 2. Try POST with query param ?_method=PUT
      try {
        const response = await api.post<Story>(
          `${ENDPOINTS.stories.update(id)}?_method=PUT`,
          data
        );
        return response.data;
      } catch {
        // 3. Try POST to create endpoint with id included in payload
        try {
          const response = await api.post<Story>(ENDPOINTS.stories.create, {
            ...data,
            id,
          });
          return response.data;
        } catch {
          // 4. Fallback to direct PATCH
          try {
            const response = await api.patch<Story>(
              ENDPOINTS.stories.update(id),
              data
            );
            return response.data;
          } catch {
            // 5. Fallback to direct PUT
            const response = await api.put<Story>(
              ENDPOINTS.stories.update(id),
              data
            );
            return response.data;
          }
        }
      }
    }
  },

  delete: async (id: number): Promise<BaseSuccessResponse> => {
    const response = await api.delete<BaseSuccessResponse>(
      ENDPOINTS.stories.delete(id)
    );
    return response.data;
  },
};

export default storyApi;
