import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

export function ProductSkeleton({ count = 0 }) {
    return(
        <SkeletonTheme baseColor="#e9ecef" highlightColor="#f8f9fa" borderRadius={12}>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="p-4 bg-white dark:bg-zinc-900 rounded-xl border border-gray-100 dark:border-zinc-800">
            <Skeleton height={160} className="mb-3" />
            <Skeleton width="70%" />
            <Skeleton width="40%" />
            <div className="mt-3">
              <Skeleton height={36} />
            </div>
          </div>
        ))}
      </div>
        </SkeletonTheme>
    );
}

export default ProductSkeleton;