import { ref, onMounted, onBeforeUnmount } from 'vue';

export function useInfiniteScroll(callback: (arg0: number) => any) {
  const loadMoreRef = ref(null);
  const isLoadingMore = ref(false);
  const currentPage = ref(1);

  const handleScroll = async () => {
    if (!isLoadingMore.value) {
      isLoadingMore.value = true;
      await callback(currentPage.value);
      currentPage.value += 1;
      isLoadingMore.value = false;
    }
  };

  let observer: IntersectionObserver;

  onMounted(() => {
    observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        handleScroll();
      }
    });

    if (loadMoreRef.value) {
      observer.observe(loadMoreRef.value);
    }
  });

  onBeforeUnmount(() => {
    if (loadMoreRef.value) {
      observer.unobserve(loadMoreRef.value);
    }
  });

  return {
    loadMoreRef,
    isLoadingMore,
    currentPage,
    handleScroll,
  };
}
