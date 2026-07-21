import clsx from 'clsx';

export const Skeleton = ({
  variant = 'text',
  width,
  height,
  className,
  count = 1,
}) => {
  const baseStyles = 'animate-pulse bg-secondary-500/40';

  const variantStyles = {
    text: 'h-4 w-full rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-md',
  };

  return (
    <div
      className={clsx('flex flex-col gap-2', className)}
      aria-busy="true"
      aria-label="Loading"
    >
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={clsx(baseStyles, variantStyles[variant])}
          style={{ width, height }}
        />
      ))}
    </div>
  );
};

export default Skeleton;
