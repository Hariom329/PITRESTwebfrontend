export interface Board {
    id: string;
    name: string;
    pins: string[]; // Pin IDs
    isPrivate: boolean;
}

export interface Pin {
    id: string;
    title: string;
    image: string;
    description?: string;
    boardId?: string;
    isPrivate?: boolean;
    isSponsored?: boolean;
    user: {
        name: string;
        avatar: string;
        isBusiness?: boolean;
    };
}

export const MOCK_BOARDS: Board[] = [
    { id: 'b1', name: 'Home Decor', pins: ['1', '4'], isPrivate: false },
    { id: 'b2', name: 'Travel Plans', pins: ['3', '7'], isPrivate: true },
    { id: 'b3', name: 'Food', pins: ['2'], isPrivate: false },
];

export const MOCK_PINS: Pin[] = [
    {
        id: '1',
        title: 'Modern Interior Design',
        image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=500&q=80',
        boardId: 'b1',
        isSponsored: true,
        user: { name: 'Interiors Co.', avatar: 'https://i.pravatar.cc/150?u=1', isBusiness: true }
    },
    {
        id: '2',
        title: 'Healthy Breakfast Ideas',
        image: 'https://images.unsplash.com/photo-1494390248081-4e521a5940db?w=500&q=80',
        boardId: 'b3',
        user: { name: 'Foodie', avatar: 'https://i.pravatar.cc/150?u=2' }
    },
    {
        id: '3',
        title: 'Travel Photography',
        image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=500&q=80',
        boardId: 'b2',
        user: { name: 'Traveler', avatar: 'https://i.pravatar.cc/150?u=3' }
    },
    {
        id: '4',
        title: 'Minimalist Art',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&q=80',
        boardId: 'b1',
        user: { name: 'ArtLover', avatar: 'https://i.pravatar.cc/150?u=4' }
    },
    {
        id: '5',
        title: 'Summer Fashion',
        image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=80',
        isSponsored: true,
        user: { name: 'Fashion Brand', avatar: 'https://i.pravatar.cc/150?u=5', isBusiness: true }
    },
    {
        id: '6',
        title: 'Tech Setup',
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&q=80',
        user: { name: 'Techie', avatar: 'https://i.pravatar.cc/150?u=6' }
    },
    {
        id: '7',
        title: 'Nature Walks',
        image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&q=80',
        boardId: 'b2',
        user: { name: 'Nature', avatar: 'https://i.pravatar.cc/150?u=7' }
    },
    {
        id: '8',
        title: 'Urban Architecture',
        image: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=500&q=80',
        user: { name: 'Architect', avatar: 'https://i.pravatar.cc/150?u=8' }
    }
];
