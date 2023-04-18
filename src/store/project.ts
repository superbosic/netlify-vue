import { ref } from 'vue';
import { ProjectInfo } from '@/types/project';

const project = ref<ProjectInfo | null>(null);

export function useProjectStore() {
  function setProject(value: ProjectInfo) {
    project.value = value;
  }

  return {
    setProject,
    project,
  };
}
