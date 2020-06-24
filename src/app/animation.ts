import { trigger, transition, style, query, animateChild, animate, group } from '@angular/animations';

export const slideInAnimation =
    trigger('routeAnimations', [
        transition('Home <=> *', 
        [
            style({ position: 'relative'}),
            query(
                ':enter, :leave', 
                [style({
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%'
                })]
            ),
            query(':enter', [
                style({ left: '-100%', opacity: 0 }),
            ]),
            query(':leave', animateChild(), { optional: true }),
            group([
                query(':leave', [
                    style({ opacity: 1 }),animate('500ms ease-out', style({ left: '100%', opacity: 0 },))
                    
                ], { optional: true }),
                query(':enter', [
                    style({ opacity: 0 }),animate('500ms ease-out', style({ left: '0%', opacity: 1 }))
                ])
            ]),
            query(':enter', animateChild()),
        ]),
        transition('Login <=> *', 
        [
            style({ position: 'relative'}),
            query(
                ':enter, :leave', 
                [style({
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%'
                })]
            ),
            query(':enter', [
                style({ left: '-100%', opacity: 0 })
            ]),
            query(':leave', animateChild(),{ optional: true }),
            group([
                query(':leave', [
                    style({ opacity: 1 }),animate('500ms ease-out', style({ left: '100%', opacity: 0 }))
                ], { optional: true }),
                query(':enter', [
                    style({ opacity: 0 }),animate('500ms ease-out', style({ left: '0%', opacity: 1 }))
                ])
            ]),
            query(':enter', animateChild()),
        ]),
        transition('Cartilla <=> *', 
        [
            style({ position: 'relative'}),
            query(
                ':enter, :leave', 
                [style({
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%'
                })]
            ),
            query(':enter', [
                style({ left: '-100%', opacity: 0 })
            ]),
            query(':leave', animateChild(), { optional: true }),
            group([
                query(':leave', [
                    style({ opacity: 1 }),animate('500ms ease-out', style({ left: '100%', opacity: 0 }))
                ], { optional: true }),
                query(':enter', [
                    style({ opacity: 0 }),animate('500ms ease-out', style({ left: '0%', opacity: 1 }))
                ])
            ]),
            query(':enter', animateChild()),
        ]),
        transition('Turnos <=> *', 
        [
            style({ position: 'relative'}),
            query(
                ':enter, :leave', 
                [style({
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%'
                })]
            ),
            query(':enter', [
                style({ left: '-100%', opacity: 0 })
            ]),
            query(':leave', animateChild(), { optional: true }),
            group([
                query(':leave', [
                    style({ opacity: 1 }),animate('500ms ease-out', style({ left: '100%', opacity: 0 }))
                ], { optional: true }),
                query(':enter', [
                    style({ opacity: 0 }),animate('500ms ease-out', style({ left: '0%', opacity: 1 }))
                ])
            ]),
            query(':enter', animateChild()),
        ]),
        transition('Contacto => *', 
        [
            style({ position: 'relative'}),
            query(
                ':enter, :leave', 
                [style({
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%'
                })]
            ),
            query(':enter', [
                style({ left: '-100%', opacity: 0 })
            ]),
            query(':leave', animateChild(), { optional: true }),
            group([
                query(':leave', [
                    style({ opacity: 1 }),animate('500ms ease-out', style({ left: '100%', opacity: 0 }))
                ], { optional: true }),
                query(':enter', [
                    style({ opacity: 0 }),animate('500ms ease-out', style({ left: '0%', opacity: 1 }))
                ])
            ]),
            query(':enter', animateChild()),
        ]),
        transition('Menu <=> Detalle-turno', 
        [
            style({ position: 'relative' }),
            query(':enter, :leave', [
                style({
                    position: 'absolute',                    
                    left: 0,
                    opacity: 0,
                    width: '100%',
                    transform: 'scale(0) translateY(100%)',
                })
            ]),
            query(':enter', [
                animate('600ms ease',
                    style({ 
                        opacity: 1,
                        transform: 'scale(1) translateY(0)',
                    })
                ),
            ]),
        ]),
        transition('Menu <=> Historia', 
        [
            style({ position: 'relative' }),
            query(':enter, :leave', [
                style({
                    position: 'absolute',                    
                    left: 0,
                    opacity: 0,
                    width: '100%',
                    transform: 'scale(0) translateY(100%)',
                })
            ]),
            query(':enter', [
                animate('600ms ease',
                    style({ 
                        opacity: 1,
                        transform: 'scale(1) translateY(0)',
                    })
                ),
            ]),
        ]),
        transition('Menu <=> Encuesta', 
        [
            style({ position: 'relative' }),
            query(':enter, :leave', [
                style({
                    position: 'absolute',                    
                    left: 0,
                    opacity: 0,
                    width: '100%',
                    transform: 'scale(0) translateY(100%)',
                })
            ]),
            query(':enter', [
                animate('600ms ease',
                    style({ 
                        opacity: 1,
                        transform: 'scale(1) translateY(0)',
                    })
                ),
            ]),
        ])    
    ]);
