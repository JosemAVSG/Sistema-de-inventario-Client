import { Link } from 'react-router-dom';
import { Button } from '@/components/atoms/Button';
import { Card } from '@/components/atoms/Card';

export const EmptyState = ({ icon, title, description, action }) => {
  return (
    <Card className="flex flex-col items-center justify-center p-12 text-center">
      {icon && (
        <div className="p-4 bg-secondary-700/50 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      {description && (
        <p className="mt-2 max-w-md text-sm text-gray-400">{description}</p>
      )}
      {action && (
        <div className="mt-6">
          {action.to ? (
            <Link
              to={action.to}
              className="inline-flex items-center justify-center rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-700"
            >
              {action.label}
            </Link>
          ) : (
            <Button onClick={action.onClick}>{action.label}</Button>
          )}
        </div>
      )}
    </Card>
  );
};

export default EmptyState;
