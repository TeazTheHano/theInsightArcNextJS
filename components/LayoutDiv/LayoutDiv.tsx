interface LayoutDivProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    id?: string;
    className?: string;
    style?: React.CSSProperties;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    ref?: React.RefObject<HTMLDivElement> | React.Ref<HTMLDivElement> | null;
    rest?: any // Thêm rest để có thể truyền thêm các props khác nếu cần
}

export const DivFlexRow: React.FC<LayoutDivProps> = ({
    children,
    id,
    className,
    style = {},
    onClick,
    ...rest
}) => {
    return (
        <div className={className} id={id}
            style={{
                display: 'flex',
                flexDirection: 'row',
                ...style
            }}
            onClick={onClick} {...rest}>
            {children}
        </div>
    )
}

export const DivFlexColumn: React.FC<LayoutDivProps> = ({
    children,
    id,
    className,
    style = {},
    onClick,
    ...rest
}) => {
    return (
        <div className={className} id={id}
            style={{
                display: 'flex',
                flexDirection: 'column',
                ...style
            }}
            onClick={onClick} {...rest}>
            {children}
        </div>
    )
}

export const DivFlexRowCenter: React.FC<LayoutDivProps> = ({
    children,
    id,
    className,
    style = {},
    onClick,
    ...rest
}) => {
    return (
        <div className={className} id={id}
            style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                ...style
            }}
            onClick={onClick} {...rest}>
            {children}
        </div>
    )
}

export const DivFlexRowStretch: React.FC<LayoutDivProps> = ({
    children,
    id,
    className,
    style = {},
    onClick,
    ...rest
}) => {
    return (
        <div className={className} id={id}
            style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'stretch',
                justifyContent: 'center',
                ...style
            }}
            onClick={onClick} {...rest}>
            {children}
        </div>
    )
}

export const DivFlexColumnCenter: React.FC<LayoutDivProps> = ({
    children,
    id,
    className,
    style = {},
    onClick,
    ...rest
}) => {
    return (
        <div className={className} id={id}
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                ...style
            }}
            onClick={onClick} {...rest}>
            {children}
        </div>
    )
}

export const DivFlexRowSpaceBetween: React.FC<LayoutDivProps> = ({
    children,
    id,
    className,
    style = {},
    onClick,
    ...rest
}) => {
    return (
        <div className={className} id={id}
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                ...style
            }}
            onClick={onClick} {...rest}>
            {children}
        </div>
    )
}

export const DivFlexColumnSpaceBetween: React.FC<LayoutDivProps> = ({
    children,
    id,
    className,
    style = {},
    onClick,
    ...rest
}) => {
    return (
        <div className={className} id={id}
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                ...style
            }}
            onClick={onClick} {...rest}>
            {children}
        </div>
    )
}

export const DivFlexRowSpaceBetweenCenter: React.FC<LayoutDivProps> = ({
    children,
    id,
    className,
    style = {},
    onClick,
    ...rest
}) => {
    return (
        <div className={className} id={id}
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                ...style
            }}
            onClick={onClick} {...rest}>
            {children}
        </div>
    )
}

export const DivFlexRowSpaceBetweenBaseline: React.FC<LayoutDivProps> = ({
    children,
    id,
    className,
    style = {},
    onClick,
    ...rest
}) => {
    return (
        <div className={className} id={id}
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                ...style
            }}
            onClick={onClick} {...rest}>
            {children}
        </div>
    )
}

export const DivFlexColumnSpaceBetweenCenter: React.FC<LayoutDivProps> = ({
    children,
    id,
    className,
    style = {},
    onClick,
    ...rest
}) => {
    return (
        <div className={className} id={id}
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                ...style
            }}
            onClick={onClick} {...rest}>
            {children}
        </div>
    )
}

export const DivFlexRowSpaceAround: React.FC<LayoutDivProps> = ({
    children,
    id,
    className,
    style = {},
    onClick,
    ...rest
}) => {
    return (
        <div className={className} id={id}
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
                ...style
            }}
            onClick={onClick} {...rest}>
            {children}
        </div>
    )
}

export const DivFlexColumnSpaceAround: React.FC<LayoutDivProps> = ({
    children,
    id,
    className,
    style = {},
    onClick,
    ...rest
}) => {
    return (
        <div className={className} id={id}
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
                ...style
            }}
            onClick={onClick} {...rest}>
            {children}
        </div>
    )
}

export const DivFlexRowSpaceAroundCenter: React.FC<LayoutDivProps> = ({
    children,
    id,
    className,
    style = {},
    onClick,
    ...rest
}) => {
    return (
        <div className={className} id={id}
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                ...style
            }}
            onClick={onClick} {...rest}>
            {children}
        </div>
    )
}

export const DivFlexColumnSpaceAroundCenter: React.FC<LayoutDivProps> = ({
    children,
    id,
    className,
    style = {},
    onClick,
    ...rest
}) => {
    return (
        <div className={className} id={id}
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
                alignItems: 'center',
                ...style
            }}
            onClick={onClick} {...rest}>
            {children}
        </div>
    )
}

export const DivFlexRowSpaceEvenly: React.FC<LayoutDivProps> = ({
    children,
    id,
    className,
    style = {},
    onClick,
    ...rest
}) => {
    return (
        <div className={className} id={id}
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                ...style
            }}
            onClick={onClick} {...rest}>
            {children}
        </div>
    )
}

export const DivFlexColumnSpaceEvenly: React.FC<LayoutDivProps> = ({
    children,
    id,
    className,
    style = {},
    onClick,
    ...rest
}) => {
    return (
        <div className={className} id={id}
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-evenly',
                ...style
            }}
            onClick={onClick} {...rest}>
            {children}
        </div>
    )
}

export const DivFlexRowSpaceEvenlyCenter: React.FC<LayoutDivProps> = ({
    children,
    id,
    className,
    style = {},
    onClick,
    ...rest
}) => {
    return (
        <div className={className} id={id}
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                ...style
            }}
            onClick={onClick} {...rest}>
            {children}
        </div>
    )
}

export const DivFlexColumnSpaceEvenlyCenter: React.FC<LayoutDivProps> = ({
    children,
    id,
    className,
    style = {},
    onClick,
    ...rest
}) => {
    return (
        <div className={className} id={id}
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                ...style
            }}
            onClick={onClick} {...rest}>
            {children}
        </div>
    )
}